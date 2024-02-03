import Home from './Home';
import React, { useState } from 'react';

const Navbar = ({ onReloadMaze }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleReloadMaze = () => {
    if (!isButtonDisabled) {
      setButtonDisabled(true);
      onReloadMaze(() => setButtonDisabled(false)); // Pass a callback to re-enable the button
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
    </nav>
  );
}

export default Navbar;
