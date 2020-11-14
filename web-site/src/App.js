import React from 'react';
import './App.css';
import {HandleImage} from './Components/HandleImage.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
        Text Steganography Web Application
        </h2>
        <HandleImage/> 
      </header>
      
    </div>
  );
}

export default App;
