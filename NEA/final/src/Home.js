import { useState, useEffect } from 'react';

const apiEndpoint = "https://euum9mrx4k.execute-api.eu-west-2.amazonaws.com/prod/api/maze?event=maze_generation&n=4&sideLen=18"

const Home = () => {
    const [mazes, setMazes] = useState(null);
    const [paths, setPaths] = useState(null);
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'GET',
                });

                if (!isMounted) {
                    return; // Prevent updating state if component is unmounted
                }
            
                if (response.ok) {
                    const data = await response.json();
                    const maze = JSON.parse(data[0]);
                    const path = data[1];
                    const final_maze = JSON.parse(maze.replace(/'/g, '"'));
                    console.log(final_maze);
                    const final_path = JSON.parse(path.replace(/'/g, '"'))
                    console.log(final_path);

                    setMazes(final_maze);
                    setPaths(final_path);
                    
                }
            } catch (error) {
                console.error("Error fetching maze data", error);
            }
        }

        fetchData();

        return () => {
            // Cleanup function
            isMounted = false;
        };

    }, [])


    return (
        <div className="Home">
            {mazes && paths}
        </div>
    );

};


export default Home;

