import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
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
