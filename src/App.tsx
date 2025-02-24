import { FC, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Photography from './components/Photography'
import RotatingGreeting from './components/RotatingGreeting'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

const formatDate = (date: Date) => {
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace(',', '');
};

const Home: FC = () => {
  const [currentTime, setCurrentTime] = useState(formatDate(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatDate(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="main-content">
      <RotatingGreeting />
      <p className="timestamp">{currentTime}</p>
      
      <p className="bio">
        Hi, I'm Vishesh. I'm a software engineer based currently a Digital Nomad, 
        Currently fun employed @Home. Previously{' '}
        <a href="https://monoceros.com" target="_blank" rel="noopener noreferrer">@Monoceros</a>,{' '}
        <a href="https://clearstreet.io" target="_blank" rel="noopener noreferrer">@ClearStreet</a>.{' '}
        Alumni from University of Waterloo with a degree in Computer Science and minor in East Asian Studies.
      </p>

      <nav className="nav-links">
        <Link to="/about">about</Link>
        <Link to="/contact">contact</Link>
        <Link to="/photography">photography</Link>
      </nav>
    </main>
  )
}

const App: FC = () => {
  return (
    <Router>
      <div className="app">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photography" element={<Photography />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
