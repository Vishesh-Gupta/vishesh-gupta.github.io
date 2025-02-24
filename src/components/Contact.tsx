import { FC } from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

const Contact: FC = () => {
  return (
    <main className="main-content">
      <h1>Contact</h1>
      
      <div className="contact-content">
        <p className="contact-item">
          Email: <a href="mailto:vishesh.gupta12@outlook.com">vishesh.gupta12@outlook.com</a>
        </p>
        <p className="contact-item">
          GitHub: <a href="https://github.com/Vishesh-gupta" target="_blank" rel="noopener noreferrer">@Vishesh-gupta</a>
        </p>
        <p className="contact-item">
          LinkedIn: <a href="https://linkedin.com/in/vishesh-gupta" target="_blank" rel="noopener noreferrer">@vishesh-gupta</a>
        </p>
      </div>

      <nav className="nav-links">
        <Link to="/">&larr; back</Link>
      </nav>
    </main>
  )
}

export default Contact 