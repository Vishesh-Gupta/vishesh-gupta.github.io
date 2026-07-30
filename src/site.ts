// Single place to edit the content of the site.

export const NAME = 'Vishesh Gupta'
export const ROLE = 'Software Engineer'

// Drop a PDF at public/resume.pdf, or point this at a hosted copy.
export const RESUME_URL = '/resume.pdf'

// Drop the photo at public/portrait.jpg. It's cropped to 4:5 and rendered at
// 136px wide, so roughly 544x680 covers a 2x screen. If the file is missing the
// portrait column removes itself rather than showing a broken image.
export const PORTRAIT = {
  src: '/portrait.jpg',
  alt: NAME,
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
