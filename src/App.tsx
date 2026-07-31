import { FC, useState } from 'react'
import Greeting from './components/Greeting'
import Portrait from './components/Portrait'
import Bio from './components/Bio'
import IconLinks from './components/IconLinks'
import './App.css'

const App: FC = () => {
  const [hasPortrait, setHasPortrait] = useState(true)

  return (
    <main className="page">
      <div className="column">
        <Greeting />

        <div className={hasPortrait ? 'body-grid' : 'body-grid is-text-only'}>
          {hasPortrait && <Portrait onMissing={() => setHasPortrait(false)} />}
          <div className="prose">
            <Bio />
            <IconLinks />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
