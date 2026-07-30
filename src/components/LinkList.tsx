import { FC } from 'react'

type Item = {
  name: string
  note: string
  url: string
}

type Props = {
  label: string
  items: Item[]
}

const isExternal = (url: string) => url.startsWith('http')

const LinkList: FC<Props> = ({ label, items }) => {
  return (
    <>
      <p className="eyebrow">{label}</p>
      <ul className="link-list">
        {items.map((item, position) => (
          <li key={item.name} style={{ animationDelay: `${120 + position * 70}ms` }}>
            <a
              href={item.url}
              {...(isExternal(item.url)
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {item.name}
            </a>
            <span className="link-note">{item.note}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default LinkList
