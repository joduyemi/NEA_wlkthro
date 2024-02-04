import { useState, useEffect } from 'react';
import Canvas from './Canvas';


const apiEndpoint = "https://euum9mrx4k.execute-api.eu-west-2.amazonaws.com/prod/api/maze?event=maze_generation&n=11&sideLen=18"

const Home = ({reloadMaze, onReloadComplete}) => {
        // overarching (arrow) function which will be imported by the main module

        const [mazes, setMazes] = useState(null);
        const [paths, setPaths] = useState(null);
        const [visited, setVisited] = useState(null);
        useEffect(() => {
            if (reloadMaze) {
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
                        console.log(data);
                        const maze = JSON.parse(data[0]);
                        const path = data[1];
                        const visited = data[2];
                        const final_maze = JSON.parse(maze.replace(/'/g, '"')); // regex to format correctly for JSON standards
                        const final_path = JSON.parse(path.replace(/'/g, '"'))
                        const final_visited = JSON.parse(visited.replace(/'/g, '"'))

                        // uses the functions defined in the useState to update the state variables    
                        setMazes(final_maze);
                        setPaths(final_path);
                        setVisited(final_visited);
                        onReloadComplete();
                        
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
            }
            

        }, [reloadMaze, onReloadComplete]) // empty dependency array means the effect runs once after the initial render
        
        return (
            <div className="Home">
                {mazes && paths && visited && <Canvas mazes={mazes} paths={paths} visited={visited} />}
            </div>
        );


};


export default Home;

