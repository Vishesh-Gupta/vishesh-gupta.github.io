"""
Strip the phone number out of the résumé before publishing it.

    pip install pikepdf
    python tools/redact-resume.py <original.pdf> public/resume.pdf

Drawing a black box over text does NOT redact a PDF — the text stays in the
content stream and any reader can pull it back out. This removes the drawing
operations, the clickable tel: annotation that carried the same number
independently of the visible text, and the orphaned object left behind when
that annotation is unlinked.

Verify afterwards; do not assume:

    grep -c 5931 public/resume.pdf     # expect 0
"""

import re
import sys

import pikepdf

SRC, DST = sys.argv[1], sys.argv[2]

pdf = pikepdf.open(SRC)
page = pdf.pages[0]
txt = page.Contents.read_bytes().decode('latin-1')

def plain(b):
    out = []
    for arr in re.findall(r'\[(.*?)\]\s*TJ', b, re.S):
        out.append(''.join(re.findall(r'\((.*?)(?<!\\)\)', arr, re.S)))
    return ''.join(out)

# The phone label and number share one baseline in the header. Dropping the
# whole line leaves three contact rows, which reads as a normal résumé; a black
# bar would read as a leaked document. If the résumé layout changes, re-find
# this baseline by dumping each text block's Tm coordinates.
PHONE_Y = '711.97'
removed = []
spans = []
for m in re.finditer(r'BT\r?\n(.*?)ET', txt, re.S):
    body = m.group(1)
    if f' {PHONE_Y} Tm' not in body:
        continue
    removed.append(plain(body))
    spans.append(m.span())

if not spans:
    sys.exit('no phone-line blocks matched — aborting rather than writing a half-redacted file')

for start, end in reversed(spans):
    txt = txt[:start] + txt[end:]

page.Contents = pdf.make_stream(txt.encode('latin-1'))

# Removing the visible text is only half of it — the header also carried a
# clickable tel: link annotation holding the same number. An annotation
# survives any amount of drawing over the page, so it has to go explicitly.
dropped_links = []
annots = page.get('/Annots')
if annots is not None:
    keep = []
    for a in annots:
        act = a.get('/A')
        uri = str(act.get('/URI')) if act is not None and '/URI' in act else ''
        if uri.lower().startswith('tel:'):
            dropped_links.append(uri)
            # Unlinking from /Annots leaves the object orphaned but still in
            # the file, URI string intact. Scrub the object in place too, so
            # the number is gone whether or not the object gets collected.
            for key in list(a.keys()):
                del a[key]
        else:
            keep.append(a)
    page['/Annots'] = pdf.make_indirect(keep)

pdf.remove_unreferenced_resources()

# Document metadata can carry the author's name, tooling, and edit history.
if '/Info' in pdf.trailer:
    del pdf.trailer['/Info']
with pdf.open_metadata(set_pikepdf_as_editor=False) as meta:
    for k in list(meta.keys()):
        del meta[k]

pdf.save(DST, linearize=True)
print('removed text runs:', removed)
print('removed link annotations:', dropped_links)
