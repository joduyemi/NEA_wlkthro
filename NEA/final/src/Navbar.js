import Home from './Home';
import React, { useState } from 'react';

const Navbar = ({ onReloadMaze, onInputChange, onInputChange2 }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleReloadMaze = () => {
    if (!isButtonDisabled) {
      setButtonDisabled(true);
      onReloadMaze();
    }
  }

  const handleChange = ((event) => {
    const value = event.target.value;
    onInputChange(value);
  })

  const handleChange2 = ((event) => {
    const value = event.target.value;
    onInputChange2(value);
  })

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
      <input type='text' id='user_input' placeholder='Type the maze size' onChange={handleChange}></input>
      <input type='text' id='algo' placeholder='Type the algorithm' onChange={handleChange2}></input>
    </nav>
  );
}

export default Navbar;

