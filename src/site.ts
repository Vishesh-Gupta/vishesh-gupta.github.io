// Single place to edit the content of the site.

export const NAME = 'Vishesh Gupta'
export const ROLE = 'Software Engineer'

// Drop a PDF at public/resume.pdf, or point this at a hosted copy.
export const RESUME_URL = '/resume.pdf'

// PLACEHOLDER. public/portrait.jpg is currently a stock landscape from
// Unsplash, not a photo of Vishesh:
// https://images.unsplash.com/photo-1506905925346-21bda4d32df4
// Overwrite that file with a real photo and update `alt` to describe it. The
// Unsplash License permits use without attribution, so nothing else has to
// change when you swap it.
//
// Rendered 136px wide in a 4:5 crop, so the two files are 272x340 and 408x510
// — the browser picks one, it never loads both. If they're missing entirely the
// portrait column removes itself rather than showing a broken image.
export const PORTRAIT = {
  src: '/portrait@2x.webp',
  srcSet: '/portrait@2x.webp 2x, /portrait@3x.webp 3x',
  alt: 'A mountain ridge rising above a sea of cloud at sunset',
}

// Linked inline from the bio. Hovering or focusing one of these swaps the note
// shown underneath.
//
// The `note` values below describe what each COMPANY does — they are not a
// description of Vishesh's work there, because that isn't something this file
// can know. Replace each one with a line about what you actually built or
// owned; that's the whole point of the slot.
export type Company = {
  url: string
  note: string
}

export const COMPANIES: Record<string, Company> = {
  Alpaca: {
    url: 'https://alpaca.markets',
    note: 'Commission-free trading and brokerage APIs for developers.',
  },
  Monoceros: {
    url: 'https://monoceros.com',
    note: 'Quantitative trading, Toronto.',
  },
  'Clear Street': {
    url: 'https://clearstreet.io',
    note: 'Prime brokerage and clearing infrastructure, New York.',
  },
}

/** Shown before anything has been hovered. */
export const DEFAULT_COMPANY = 'Alpaca'

export type IconName = 'linkedin' | 'github' | 'resume' | 'email'

export const ELSEWHERE: { label: string; url: string; icon: IconName }[] = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/vishesh-gupta', icon: 'linkedin' },
  { label: 'GitHub', url: 'https://github.com/Vishesh-Gupta', icon: 'github' },
  { label: 'Résumé', url: RESUME_URL, icon: 'resume' },
  { label: 'Email', url: 'mailto:vishesh.gupta12@outlook.com', icon: 'email' },
]
