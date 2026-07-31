// Single place to edit the content of the site.

export const NAME = 'Vishesh Gupta'
export const ROLE = 'Senior Software Engineer'

export const RESUME_URL = '/resume.pdf'

// Cropped 4:5 from the original and shipped at two densities — the browser
// picks one, it never loads both. On a pointer device the image stretches to
// the height of the text beside it, so framing matters more than the exact
// ratio. If the files are missing the portrait column removes itself rather
// than showing a broken image.
export const PORTRAIT = {
  src: '/portrait@2x.webp',
  srcSet: '/portrait@2x.webp 2x, /portrait@3x.webp 3x',
  alt: 'Vishesh Gupta sitting on a rock beside a misted koi pond',
}

// Linked inline from the bio. Hovering or focusing one swaps the detail shown
// underneath. Keep `note` to roughly one line at the prose width — the slot
// reserves a fixed height so the icons below it never move.
export type Company = {
  url: string
  where: string
  note: string
}

export const COMPANIES: Record<string, Company> = {
  Alpaca: {
    url: 'https://alpaca.markets',
    where: 'Globally remote · 2025 –',
    note: 'Self-clearing integration, network interconnect architecture, and Terraform modules for auto-clustered regions.',
  },
  Monoceros: {
    url: 'https://monoceros.com',
    where: 'Cayman Islands · 2024 – 25',
    note: 'Infra lead: built and ran the software and hardware carrying market data for four teams.',
  },
  'Clear Street': {
    url: 'https://clearstreet.io',
    where: 'New York · 2021 – 24',
    note: 'Vault, Teleport and Buf integrations, plus IaC tooling that cut access-request overhead by 40%.',
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
