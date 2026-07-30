import { FC } from 'react'
import Greeting from './components/Greeting'
import Bio from './components/Bio'
import IconLinks from './components/IconLinks'
import './App.css'

const App: FC = () => (
  <main className="page">
    <div className="column">
      <Greeting />
      <Bio />
      <IconLinks />
    </div>
  </main>
)

export default App
