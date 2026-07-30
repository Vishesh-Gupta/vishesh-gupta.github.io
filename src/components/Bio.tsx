import { FC } from 'react'
import { COMPANIES, NAME, ROLE } from '../site'

/** A company named in the bio, linked to its site. */
const At: FC<{ name: keyof typeof COMPANIES }> = ({ name }) => (
  <a className="company" href={COMPANIES[name]} target="_blank" rel="noopener noreferrer">
    {name}
  </a>
)

const Bio: FC = () => (
  <section className="bio-block">
    <p className="eyebrow">
      {NAME} <span className="dot">·</span> {ROLE}
    </p>

    <p className="bio">
      I&rsquo;m a software engineer working on trading and market infrastructure &mdash;
      the systems sitting underneath brokerage, clearing, and execution. Currently at{' '}
      <At name="Alpaca" />; previously <At name="Monoceros" /> and{' '}
      <At name="Clear Street" />. I studied Computer Science at the University of
      Waterloo, with a minor in East Asian Studies. Mostly I care about backend systems
      that stay boring under load: clear data models, predictable latency, and code
      someone else can pick up a year later. Usually somewhere between timezones.
    </p>
  </section>
)

export default Bio
