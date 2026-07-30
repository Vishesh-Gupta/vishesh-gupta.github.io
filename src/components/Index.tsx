import { FC } from 'react'
import { BIO, NAME, ROLE } from '../site'

const Index: FC = () => {
  return (
    <>
      <p className="eyebrow">
        {NAME} <span className="dot">·</span> {ROLE}
      </p>
      <p className="bio">{BIO}</p>
    </>
  )
}

export default Index
