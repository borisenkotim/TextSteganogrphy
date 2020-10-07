import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {HandleImage} from './Components/HandleImage.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        Text Steganography Web Application
        </p>
        <HandleImage/> 
      </header>
      
    </div>
  );
}

export default App;
