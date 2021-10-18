import './App.css';
import BasicCard from './components/card'

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{
        background: `url("https://wallpapershome.com/images/wallpapers/ice-3840x2160-glacier-4k-15666.jpg")`
      }}>

        Vishesh Gupta
        Software Engineer
        <BasicCard/>
        <></>
      </header>
    </div>
  );
}

export default App;
