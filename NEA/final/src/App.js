import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';

function App() {
  // state variables for maze and maze size
  const [reloadMaze, setReloadMaze] = useState(false);
  const [mazeSize, setMazeSize] = useState("");
  const [userAlgo, setUserAlgo] = useState("");
  const [userStart, setUserStart] = useState("");
  const [userEnd, setUserEnd] = useState("");
  const [speedLabel, setSpeedLabel] = useState("middle");


  // function to toggle maze state variable, triggering Home component re-render
  const handleMazeChange = () => {
    setReloadMaze(true);
  }

  // function to toggle maze size state variable
  const handleSizeChange = (value) => {
    setMazeSize(value);
  }
  
  // function to toggle pathfinding algorithm state variable
  const handleAlgoChange = (value) => {
    setUserAlgo(value);
  }

  // function to toggle pathfinding algorithm state variable
  const handleStartChange = (value) => {
    setUserStart(parseInt(value));
  }

  // function to toggle pathfinding algorithm state variable
  const handleEndChange = (value) => {
    setUserEnd(parseInt(value));
  }
  
  const handleIt = (value) => {
    setSpeedLabel(value);
  }

  return (
    <div className="App">
      <Navbar onReloadMaze={handleMazeChange} mazeSize={mazeSize} userAlgo={userAlgo} userStart={userStart} userEnd={userEnd} onInputChange={handleSizeChange} onInputChange2={handleAlgoChange} onInputChange3={handleStartChange} onInputChange4={handleEndChange} speedLabel={speedLabel} onInputChange5={handleIt}/>
      <div className="content">
        <Home reloadMaze={reloadMaze} onReloadComplete={() => setReloadMaze(false)} mazeSize={mazeSize} userAlgo={userAlgo} userStart={userStart} userEnd={userEnd} speedLabel={speedLabel}/>
      </div>
    </div>
  );
}

export default App;
