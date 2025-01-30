import { FC } from 'react'
import './App.css'

const App: FC = () => {
  return (
    <div className="app">
      <div className="center-container">
        <main className="main-content" >
          <div>
            <img 
              src="https://picsum.photos/150/150"
              alt="Random placeholder image" 
              className="profile-image"
              style={{
                borderRadius: '50%',
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                margin: '0 auto',
                display: 'block',
                border: '3px solid #eee',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
              }}
            />
          </div>
          <div className="content" style={{ padding: '0 2rem' }}>
            <p style={{  
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: '#555',
              letterSpacing: '0.5px'
            }}>
              Welcome to my personal website
            </p>
            <p style={{  
              lineHeight: '1.8', 
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: '#666',
              letterSpacing: '0.5px'
            }}>
              I am a passionate software engineer who loves building unique financial solutions. 
              I've had the privilege of working at <a href="https://monoceros.com" style={{ color: '#000', textDecoration: 'none' }}>Monoceros</a> and{' '}
              <a href="https://clearstreet.io" style={{ color: '#000', textDecoration: 'none' }}>ClearStreet</a>, where I've contributed to innovative projects.
            </p>
          </div>
        </main>
        <div style={{ 
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            background: 'transparent',
            cursor: 'pointer'
          }}>
            Portfolio
          </button>
          <button style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            background: 'transparent',
            cursor: 'pointer'
          }}>
            Resume
          </button>
          <button style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            background: 'transparent',
            cursor: 'pointer'
          }}>
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
