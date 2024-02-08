import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';

function App() {
  const [reloadMaze, setReloadMaze] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleReloadMaze = () => {
    setReloadMaze(true);
  }

  const handleInputChange = (value) => {
    setUserInput(value);
  }

  return (
    <div className="App">
      <Navbar onReloadMaze={handleReloadMaze} userInput={userInput} onInputChange={handleInputChange} />
      <div className="content">
        <Home reloadMaze={reloadMaze} onReloadComplete={() => setReloadMaze(false)} userInput={userInput} />
      </div>
    </div>
  );
}

export default App;
