import { FC } from 'react'
import './ThemeToggle.css'

const ThemeToggle: FC = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark-mode');
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <div className="icon-wrapper">
        <span className="sun">☀️</span>
        <span className="moon">🌙</span>
      </div>
    </button>
  );
};

export default ThemeToggle; 