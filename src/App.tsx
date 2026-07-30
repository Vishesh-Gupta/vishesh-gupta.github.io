import { FC } from 'react'
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import Greeting from './components/Greeting'
import Index from './components/Index'
import LinkList from './components/LinkList'
import { ELSEWHERE, WORK } from './site'
import './App.css'

const nav = [
  { to: '/', label: 'index' },
  { to: '/work', label: 'work' },
  { to: '/elsewhere', label: 'elsewhere' },
]

const Shell: FC = () => {
  const location = useLocation()

  return (
    <main className="page">
      <div className="column">
        <Greeting />

        <div className="view" key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<LinkList label="Work" items={WORK} />} />
            <Route
              path="/elsewhere"
              element={<LinkList label="Elsewhere" items={ELSEWHERE} />}
            />
            <Route path="*" element={<Index />} />
          </Routes>
        </div>

        <nav className="nav">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </main>
  )
}

const App: FC = () => (
  <Router>
    <Shell />
  </Router>
)

export default App
