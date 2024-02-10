import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Canvas from './Canvas';

function App() {
  const [reloadMaze, setReloadMaze] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [userAlgo, setUserAlgo] = useState("");

  const handleReloadMaze = () => {
    setReloadMaze(true);
  }

  const handleInputChange = (value) => {
    setUserInput(value);
  }

  const handleInputChange2 = (value) => {
    setUserAlgo(value);
  }

  return (
    <div className="App">
      <Navbar onReloadMaze={handleReloadMaze} userInput={userInput} userAlgo={userAlgo} onInputChange={handleInputChange} onInputChange2={handleInputChange2} />
      <div className="content">
        <Home reloadMaze={reloadMaze} onReloadComplete={() => setReloadMaze(false)} userInput={userInput} userAlgo={userAlgo} />
      </div>
    </div>
  );
}

export default App;
