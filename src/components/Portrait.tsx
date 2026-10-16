import { FC, useEffect, useRef } from 'react'
import { PORTRAIT } from '../site'

/**
 * Reports upward if the file isn't there, so the layout can drop back to a
 * single column instead of leaving a gap where the photo would be.
 */
const Portrait: FC<{ onMissing: () => void }> = ({ onMissing }) => {
  const img = useRef<HTMLImageElement>(null)

  // The <img> ships in the prerendered HTML, so it can fail to load before
  // hydration attaches onError. Catch that case once the component is live.
  useEffect(() => {
    const el = img.current
    if (el && el.complete && el.naturalWidth === 0) onMissing()
  }, [onMissing])

  return (
    <figure className="portrait">
      <img
        ref={img}
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
}

export default Portrait
