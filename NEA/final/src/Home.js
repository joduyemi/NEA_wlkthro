import { useState, useEffect } from 'react';
import Canvas from './Canvas';


const apiEndpoint = "https://euum9mrx4k.execute-api.eu-west-2.amazonaws.com/prod/api/maze?event=maze_generation&n=15&sideLen=18"

const Home = () => {
        // overarching (arrow) function which will be imported by the main module

        const [mazes, setMazes] = useState(null);
        const [paths, setPaths] = useState(null);
        useEffect(() => {
            let isMounted = true;
            const fetchData = async () => {
                // uses error-handling to fetch the data
                try {
                    const response = await fetch(apiEndpoint, { // async function to give the getch time to return a response
                        method: 'GET',
                    });

                    if (!isMounted) {
                        return; // prevent state updates if component is unmounted
                    }
    
                    if (response.ok) {
                        const data = await response.json();
                        const maze = JSON.parse(data[0]);
                        const path = data[1];
                        const final_maze = JSON.parse(maze.replace(/'/g, '"')); // regex to format correctly for JSON standards
                        console.log(final_maze);
                        const final_path = JSON.parse(path.replace(/'/g, '"'))
                        console.log(final_path);

                        // uses the functions defined in the useState to update the state variables    
                        setMazes(final_maze);
                        setPaths(final_path);
                        
                    }
                } catch (error) {
                    console.error("Error fetching maze data", error);
                }
            }

            
            fetchData();

            return () => {
                // cleanup function
                isMounted = false;
            };

        }, []) // empty dependency array means the effect runs once after the initial render
        
        return (
            <div className="Home">
                {mazes && paths && <Canvas mazes={mazes} paths={paths} />}
            </div>
        );


};


export default Home;

