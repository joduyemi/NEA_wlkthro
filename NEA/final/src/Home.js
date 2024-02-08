import { useState, useEffect } from 'react';
import Canvas from './Canvas';


const Home = ({reloadMaze, onReloadComplete, userInput}) => {
        const apiEndpoint = `https://euum9mrx4k.execute-api.eu-west-2.amazonaws.com/prod/api/maze?event=maze_generation&n=${userInput}&sideLen=18`
        // overarching (arrow) function which will be imported by the main module
        console.log(userInput);
        const [mazes, setMazes] = useState(null);
        const [paths, setPaths] = useState(null);
        const [visited, setVisited] = useState(null);
        const [times, setTimes] = useState(null);
        const [pathTimes, setPathTimes] = useState(null);
        const [gh, setGh] = useState(userInput);
        
        useEffect(() => {
            setGh(userInput); // Update gh whenever userInput changes
        }, [userInput]);

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
                            const maze = JSON.parse(data[0]);
                            const path = data[1];
                            const visited2 = data[2];
                            const times2 = data[3];
                            const pathTimes2 = data[4];
                            const final_maze = JSON.parse(maze.replace(/'/g, '"')); // regex to format correctly for JSON standards
                            const final_path = JSON.parse(path.replace(/'/g, '"'));
                            const final_visited = JSON.parse(visited2.replace(/'/g, '"'));
                            const final_times = JSON.parse(times2.replace(/'/g, '"'));
                            const final_path_times = JSON.parse(pathTimes2.replace(/'/g, '"'));
        

                            // uses the functions defined in the useState to update the state variables    
                            setMazes(final_maze);
                            setPaths(final_path);
                            setVisited(final_visited);
                            setTimes(final_times);
                            setPathTimes(final_path_times)
        
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
            

        }, [reloadMaze, onReloadComplete, userInput]) 
        
        return (
            <div className="Home">
                {mazes && paths && visited && gh && <Canvas mazes={mazes} paths={paths} visited={visited} times={times} pathTimes={pathTimes} gh={gh}/>}
            </div>
        );


};


export default Home;

