import { FC } from 'react'
import { PORTRAIT } from '../site'

/**
 * Reports upward if the file isn't there, so the layout can drop back to a
 * single column instead of leaving a gap where the photo would be.
 */
const Portrait: FC<{ onMissing: () => void }> = ({ onMissing }) => (
  <figure className="portrait">
    <img
      src={PORTRAIT.src}
      srcSet={PORTRAIT.srcSet}
      alt={PORTRAIT.alt}
      width="448"
      height="774"
      decoding="async"
      onError={onMissing}
    />
  </figure>
)

export default Portrait
