// Single place to edit the content of the site.

export const NAME = 'Vishesh Gupta'
export const ROLE = 'Software Engineer'

// Drop a PDF at public/resume.pdf, or point this at a hosted copy.
export const RESUME_URL = '/resume.pdf'

export const BIO = `I'm a software engineer working on trading and market infrastructure —
the systems sitting underneath brokerage, clearing, and execution. Currently at Alpaca;
previously Monoceros and Clear Street. I studied Computer Science at the University of
Waterloo, with a minor in East Asian Studies. Mostly I care about backend systems that
stay boring under load: clear data models, predictable latency, and code someone else can
pick up a year later. Usually somewhere between timezones.`

export const WORK = [
  {
    name: 'Alpaca',
    note: 'Trading and brokerage APIs',
    url: 'https://alpaca.markets',
  },
  {
    name: 'Monoceros',
    note: 'Quantitative trading',
    url: 'https://monoceros.com',
  },
  {
    name: 'Clear Street',
    note: 'Prime brokerage and clearing',
    url: 'https://clearstreet.io',
  },
]

export const ELSEWHERE = [
  {
    name: 'LinkedIn',
    note: 'in/vishesh-gupta',
    url: 'https://linkedin.com/in/vishesh-gupta',
  },
  {
    name: 'GitHub',
    note: '@Vishesh-Gupta',
    url: 'https://github.com/Vishesh-Gupta',
  },
  {
    name: 'Résumé',
    note: 'PDF',
    url: RESUME_URL,
  },
  {
    name: 'Email',
    note: 'vishesh.gupta12@outlook.com',
    url: 'mailto:vishesh.gupta12@outlook.com',
  },
]
