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
// The image is cropped to 4:5 and rendered 136px wide, so roughly 544x680
// covers a 2x screen. If the file is missing entirely, the portrait column
// removes itself rather than showing a broken image.
export const PORTRAIT = {
  src: '/portrait.jpg',
  alt: 'A mountain ridge rising above a sea of cloud at sunset',
}

// Linked inline from the bio.
export const COMPANIES: Record<string, string> = {
  Alpaca: 'https://alpaca.markets',
  Monoceros: 'https://monoceros.com',
  'Clear Street': 'https://clearstreet.io',
}

export type IconName = 'linkedin' | 'github' | 'resume' | 'email'

export const ELSEWHERE: { label: string; url: string; icon: IconName }[] = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/vishesh-gupta', icon: 'linkedin' },
  { label: 'GitHub', url: 'https://github.com/Vishesh-Gupta', icon: 'github' },
  { label: 'Résumé', url: RESUME_URL, icon: 'resume' },
  { label: 'Email', url: 'mailto:vishesh.gupta12@outlook.com', icon: 'email' },
]
