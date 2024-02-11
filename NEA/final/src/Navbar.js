import React, { useState } from 'react';

const Navbar = ({ onReloadMaze, onInputChange, onInputChange2, onInputChange3, onInputChange4 }) => {
  // state variable to manage if button is enabled
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  // ensures maze reload button is disabled to prevent multiple requests during maze reload, then calls onReloadMaze from App
  const handleReloadMaze = () => {
    if (!isButtonDisabled) {
      setButtonDisabled(true);
      onReloadMaze();
    }
  }

  // handles the onChange of the maze size input and passes it to the parent (App) through the prop
  const handleMazeSize = ((event) => {
    const value = event.target.value;
    onInputChange(value);
  })

  // handles the onChange of the maze algo input and passes it to the parent (App) through the prop
  const handleMazeAlgo = ((event) => {
    const value = event.target.value;
    onInputChange2(value);
  })

  // handles the onChange of the maze start input and passes it to the parent (App) through the prop
const handleMazeStart = (event) => {
  const mazeSize = document.getElementById('user_input').value;
  if (!mazeSize || isNaN(parseInt(mazeSize))) {
    alert('Please enter the maze size first!');
    return;
  }
  const value = parseInt(event.target.value); 
  const maxSize = parseInt(mazeSize) ** 2 - 1; // calculate max value based on maze size
  if (!isNaN(value) && value <= maxSize) { // validate if value is a number and within range
    onInputChange3(value.toString());
  } else {
    alert('Invalid input! Please enter a number less than or equal to ' + maxSize);
  }
}

// handles the onChange of the maze end input and passes it to the parent (App) through the prop
const handleMazeEnd = (event) => {
  const mazeSize = document.getElementById('user_input').value;
  if (!mazeSize || isNaN(parseInt(mazeSize))) {
    alert('Please enter the maze size first!');
    return;
  }
  const value = parseInt(event.target.value); 
  const maxSize = parseInt(mazeSize) ** 2 - 1; // calculate max value based on maze size
  if (!isNaN(value) && value <= maxSize) { // validate if value is a number and within range
    onInputChange4(value.toString());
  } else {
    alert('Invalid input! Please enter a number less than or equal to ' + maxSize);
  }
}



  return (
    <nav className="navbar">
      <h1>Find your path</h1>
      <div className="links"></div>
      <a href="/">Home</a>
      <button
        onClick={handleReloadMaze}
        style={{
          color: "white",
          backgroundColor: isButtonDisabled ? 'gray' : '#f1356d',
          borderRadius: "8px",
        }}
        disabled={isButtonDisabled}
      >
        Create a new maze
      </button>
      <input type='text' id='user_input' placeholder='Type the maze size' onChange={handleMazeSize}></input>
      <select id='algo' onChange={handleMazeAlgo}>
        <option value="astar">A*</option>
        <option value="dijkstra">Dijkstra</option>
      </select>
      <input type='text' id='start' placeholder='Type the start' onChange={handleMazeStart}></input>
      <input type='text' id='end' placeholder='Type the end' onChange={handleMazeEnd}></input>
    </nav>
    
  );
}

export default Navbar;

