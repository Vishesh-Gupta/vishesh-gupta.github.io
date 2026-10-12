"""Generate public/contours.svg: iso-lines of a smooth scalar field.

The background carries a topographic map of a function - the contour lines
of a sum of a few sines, extracted with marching squares. It is generated
here rather than drawn at runtime so the page pays nothing for it: the SVG
is a static asset rasterised once by the browser.

Run from the repo root:  python3 tools/contours.py

Tunables are at the top. Keep the output small - it ships on every visit.
"""

import math
import pathlib

W, H = 2400, 1500          # SVG user units; scaled with background-size: cover
NX, NY = 132, 83           # grid cells; the field is smooth so this is plenty
LEVELS = 22                # iso-lines
EPS = 2.2                  # Douglas-Peucker tolerance, in user units
OUT = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'contours.svg'


def field(u, v):
    """Smooth, aperiodic-looking, no symmetry axis. u, v in [0, 1]."""
    # Frequencies sized so the unit domain holds a few full periods of each
    # term; at half these values the map was a handful of broad arcs.
    return (math.sin(5.6 * u + 0.9 * math.sin(4.1 * v))
            + 0.8 * math.sin(7.3 * v + 1.2 * math.cos(4.9 * u))
            + 0.6 * math.sin(9.1 * (u + v) + 0.5)
            + 0.4 * math.sin(12.4 * (u - 0.6 * v) + 1.9))


def marching_squares(grid, level):
    """Yield line segments ((x0, y0), (x1, y1)) in grid coordinates."""
    def lerp(p, q, vp, vq):
        t = 0.5 if vq == vp else (level - vp) / (vq - vp)
        return (p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t)

    for j in range(NY):
        for i in range(NX):
            a, b = grid[j][i], grid[j][i + 1]
            c, d = grid[j + 1][i + 1], grid[j + 1][i]
            idx = (a > level) << 3 | (b > level) << 2 | (c > level) << 1 | (d > level)
            if idx in (0, 15):
                continue
            tl, tr, br, bl = (i, j), (i + 1, j), (i + 1, j + 1), (i, j + 1)
            top = lerp(tl, tr, a, b)
            right = lerp(tr, br, b, c)
            bottom = lerp(bl, br, d, c)
            left = lerp(tl, bl, a, d)
            centre = (a + b + c + d) / 4 > level
            table = {
                1: [(left, bottom)], 2: [(bottom, right)], 3: [(left, right)],
                4: [(top, right)], 6: [(top, bottom)], 7: [(top, left)],
                8: [(left, top)], 9: [(top, bottom)], 11: [(top, right)],
                12: [(left, right)], 13: [(bottom, right)], 14: [(left, bottom)],
                5: [(left, top), (right, bottom)] if centre else [(left, bottom), (top, right)],
                10: [(top, right), (bottom, left)] if centre else [(top, left), (right, bottom)],
            }
            for s in table[idx]:
                yield s


def join(segments):
    """Chain segments into polylines by matching endpoints."""
    key = lambda p: (round(p[0], 4), round(p[1], 4))
    ends = {}
    for n, (p, q) in enumerate(segments):
        ends.setdefault(key(p), []).append(n)
        ends.setdefault(key(q), []).append(n)
    used = [False] * len(segments)
    lines = []
    for n in range(len(segments)):
        if used[n]:
            continue
        used[n] = True
        p, q = segments[n]
        line = [p, q]
        # Extend forward from q, then backward from p.
        for end in (1, 0):
            while True:
                tip = line[-1] if end else line[0]
                nxt = next((m for m in ends.get(key(tip), []) if not used[m]), None)
                if nxt is None:
                    break
                used[nxt] = True
                a, b = segments[nxt]
                other = b if key(a) == key(tip) else a
                line.append(other) if end else line.insert(0, other)
        lines.append(line)
    return lines


def simplify(pts, eps):
    """Ramer-Douglas-Peucker."""
    if len(pts) < 3:
        return pts
    (x0, y0), (x1, y1) = pts[0], pts[-1]
    dx, dy = x1 - x0, y1 - y0
    L = math.hypot(dx, dy) or 1e-9
    best, bi = 0.0, 0
    for k in range(1, len(pts) - 1):
        px, py = pts[k]
        dist = abs(dy * px - dx * py + x1 * y0 - y1 * x0) / L
        if dist > best:
            best, bi = dist, k
    if best > eps:
        return simplify(pts[:bi + 1], eps)[:-1] + simplify(pts[bi:], eps)
    return [pts[0], pts[-1]]


def main():
    grid = [[field(i / NX, j / NY) for i in range(NX + 1)] for j in range(NY + 1)]
    lo = min(min(r) for r in grid)
    hi = max(max(r) for r in grid)
    sx, sy = W / NX, H / NY
    paths = []
    npts = 0
    for k in range(LEVELS):
        level = lo + (hi - lo) * (k + 0.5) / LEVELS
        segs = list(marching_squares(grid, level))
        for line in join(segs):
            pts = simplify([(x * sx, y * sy) for x, y in line], EPS)
            if len(pts) < 2:
                continue
            npts += len(pts)
            paths.append('<polyline points="' +
                         ' '.join(f'{x:.0f},{y:.0f}' for x, y in pts) + '"/>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
           f'preserveAspectRatio="xMidYMid slice">'
           # Colour and opacity are the page's business (see .field in
           # src/index.css); the lines themselves are plain white hairlines.
           f'<g fill="none" stroke="#fff" stroke-width="1.1" '
           f'stroke-linejoin="round" stroke-linecap="round">'
           + ''.join(paths) + '</g></svg>')
    OUT.write_text(svg)
    print(f'{OUT.relative_to(OUT.parents[1])}: {LEVELS} levels, {len(paths)} polylines, '
          f'{npts} points, {len(svg) / 1024:.1f} kB')


if __name__ == '__main__':
    main()
