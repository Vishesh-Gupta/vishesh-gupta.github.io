import { FC } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

const About: FC = () => {
  return (
    <main className="main-content">
      <h1>About</h1>
      
      <div className="about-content">
        <p className="about-text">
          Hi, my name is Vishesh. I currently work remotely as a full-time software engineer,
          currently fun employed @Home.
        </p>

        <p className="about-text">
          I'm a CS graduate from the University of Waterloo with a minor in East Asian Studies.
        </p>

        <p className="about-text">
          Previously I was a software engineer at Monoceros in Toronto, ON, Clear Street in New York, 
          and various other positions.
        </p>

        <p className="about-text">
          My primary professional interests are in backend development, modern web infrastructure, 
          and distributed systems.
        </p>

        <p className="about-text">
          Currently working on some projects that will be published on this website soon, stay tuned!
        </p>
      </div>

      <nav className="nav-links">
        <Link to="/">&larr; back</Link>
      </nav>
    </main>
  )
}

export default About 