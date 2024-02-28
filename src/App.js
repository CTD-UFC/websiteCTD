import logo from './logo.svg';
import './App.css';
import React from 'react';
import ButtonCreator from './components/ButtonCreator/ButtonCreator'; 
import TitleCreator from './components/TitleCreator/TitleCreator'; 

function App() {
  return (
    <div className="App">
      <TitleCreator /> {/* Renderize o componente ButtonCreator */}
      <ButtonCreator /> {/* Renderize o componente ButtonCreator */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
