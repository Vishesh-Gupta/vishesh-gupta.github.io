import { FC, useState } from 'react'
import { COMPANIES, DEFAULT_COMPANY, NAME, ROLE } from '../site'

type AtProps = {
  name: string
  active: boolean
  onSelect: (name: string) => void
}

/**
 * A company named in the bio. Pointing at it (or tabbing to it) swaps the
 * detail underneath; the link itself still goes to the company.
 *
 * Declared outside Bio so React keeps the same element across state changes —
 * re-creating it inline would remount the anchor and drop keyboard focus.
 */
const At: FC<AtProps> = ({ name, active, onSelect }) => (
  <a
    className={active ? 'company is-active' : 'company'}
    href={COMPANIES[name].url}
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={() => onSelect(name)}
    onFocus={() => onSelect(name)}
  >
    {name}
  </a>
)

const Bio: FC = () => {
  // Sticky rather than resetting on mouse-out: snapping back the moment the
  // cursor leaves would make the detail unreadable.
  const [active, setActive] = useState(DEFAULT_COMPANY)

  const at = (name: string) => (
    <At name={name} active={active === name} onSelect={setActive} />
  )

  return (
    <section className="bio-block">
      <p className="eyebrow">
        {NAME} <span className="dot">·</span> {ROLE}
      </p>

      <p className="bio">
        I&rsquo;m a senior software engineer working on the infrastructure under trading
        systems &mdash; clearing integrations, network interconnects, and the tooling
        teams use to ship against them. Currently at {at('Alpaca')}; before that infra
        lead at {at('Monoceros')}, and four years at {at('Clear Street')}. I studied
        Computer Science at the University of Waterloo, with a minor in East Asian
        Studies. Mostly I care about systems that stay boring under load, and about
        turning manual, communication-heavy work into something self-serve. Usually
        somewhere between timezones.
      </p>

      {/* Pointer devices: one reserved slot that swaps. */}
      <p className="company-note" aria-live="polite">
        <span key={active}>
          <span className="company-note-label">{active}</span>
          <span className="company-note-where">{COMPANIES[active].where}</span>
          <span className="company-note-text">{COMPANIES[active].note}</span>
        </span>
      </p>

      {/* Touch devices, where there's no hover to reveal it: show them all. */}
      <ul className="company-notes">
        {Object.entries(COMPANIES).map(([name, company]) => (
          <li key={name}>
            <span className="company-note-label">{name}</span>
            <span className="company-note-where">{company.where}</span>
            <span className="company-note-text">{company.note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Bio
