import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';

function App() {

  const [reloadMaze, setReloadMaze] = useState(false);

  const handleReloadMaze = () => {
    setReloadMaze(true);
  }
  return (
    <div className="App">
      <Navbar onReloadMaze={handleReloadMaze}/>
      <div className="content">
        <Home reloadMaze={reloadMaze} onReloadComplete={() => setReloadMaze(false)}/>
      </div>
    </div>
  );
}

export default App;