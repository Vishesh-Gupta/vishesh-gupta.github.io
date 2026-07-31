import { FC } from 'react'
import Icon from './Icons'
import { ELSEWHERE } from '../site'

const IconLinks: FC = () => (
  <nav className="icons" aria-label="Elsewhere">
    {ELSEWHERE.map((item, position) => (
      <a
        key={item.label}
        className="icon-link"
        href={item.url}
        aria-label={item.label}
        title={item.label}
        style={{ animationDelay: `${260 + position * 80}ms` }}
        {...(item.url.startsWith('http')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        <Icon name={item.icon} />
      </a>
    ))}
  </nav>
)

export default IconLinks
