import { FC } from 'react'
import type { IconName } from '../site'

/**
 * Brand marks are drawn filled; the generic icons are stroked at a weight that
 * matches their optical density at 20px.
 */
const paths: Record<IconName, JSX.Element> = {
  linkedin: (
    <g fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 9.75h5.16V21H2.4V9.75Z" />
      <path d="M10.2 9.75h4.95v1.54h.07c.69-1.24 2.37-2.05 4.06-2.05 4.34 0 5.14 2.7 5.14 6.21V21h-5.16v-4.75c0-1.13-.02-2.59-1.62-2.59-1.62 0-1.87 1.23-1.87 2.51V21H10.2V9.75Z" />
    </g>
  ),
  github: (
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.53.1.72-.23.72-.5 0-.25-.01-1.07-.01-1.95-2.7.5-3.4-.66-3.62-1.27-.12-.31-.65-1.27-1.11-1.53-.38-.2-.92-.7-.01-.72.85-.01 1.46.79 1.66 1.11.97 1.64 2.53 1.18 3.15.9.1-.7.38-1.18.69-1.45-2.4-.27-4.92-1.2-4.92-5.33 0-1.18.42-2.15 1.11-2.9-.11-.28-.48-1.38.11-2.87 0 0 .9-.29 2.96 1.1a10 10 0 0 1 5.4 0c2.05-1.4 2.95-1.1 2.95-1.1.59 1.49.22 2.59.11 2.86.69.76 1.11 1.72 1.11 2.9 0 4.15-2.53 5.07-4.93 5.34.39.34.73 1 .73 2.02 0 1.46-.01 2.64-.01 3 0 .28.19.62.72.51A10.5 10.5 0 0 0 12 1.5Z"
    />
  ),
  resume: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2.75H6.5a1.75 1.75 0 0 0-1.75 1.75v15a1.75 1.75 0 0 0 1.75 1.75h11a1.75 1.75 0 0 0 1.75-1.75V8Z" />
      <path d="M13.75 3v5.25H19" />
      <path d="M8.5 13.5h7M8.5 17h4.5" />
    </g>
  ),
  email: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2" />
      <path d="m3.5 7 8.5 6.25L20.5 7" />
    </g>
  ),
}

const Icon: FC<{ name: IconName }> = ({ name }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
    {paths[name]}
  </svg>
)

export default Icon
