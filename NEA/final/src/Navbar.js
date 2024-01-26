import Home from './Home';
import React from 'react';

const Navbar = ({onReloadMaze}) => {


    return (  
        <nav className="navbar">
            <h1>Find your path</h1>
            <div className="links"></div>
            <a href="/">Home</a>
            <button onClick={onReloadMaze} style={{
                color:"white",
                backgroundColor: '#f1356d',
                borderRadius: "8px",
            }}>Create a new maze</button>
        </nav>
    );
}
 
export default Navbar;