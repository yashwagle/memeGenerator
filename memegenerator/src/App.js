import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar.js"
import InputArea from "./Components/InputArea.js"

function App() {
  return (
  <div className="nomargin">
    <Navbar />
    <InputArea />
  </div>
  );
}

export default App;
