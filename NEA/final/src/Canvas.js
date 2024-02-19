import React, { useEffect, useRef } from 'react';

const Canvas = ({mazes, paths, visited, times, pathTimes, userStart, userEnd, speedLabel}) => {
    const start = userStart;
    const end = userEnd;
    let timer = 700;
    if (speedLabel == "slow") {
        timer = 2000;
    }
    else if (speedLabel == "fast") {
        timer = 100;
    }
    else {
        timer = 700;
    }
    console.log(timer);
    // function to interactively display the maze
    // use a useRef hook to get the HTML canvas element of the DOM (outside of the useEffect to persist through rerenders)
    const canvasRef = useRef(null);
    useEffect(() => {
        let finished = false;
        // always references CURRENT value of canvasRef, provided it exists
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas element is not available. ");
            return;
        }
        
        const values = Object.values(mazes);

        const ctx = canvas.getContext("2d");
        
        const clearCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

        const cellSize = 40;


        const drawMaze = (values) => {
            // recursively draws the maze
            values.forEach(value => {
                const x = value.x;
                const y = value.y;
                const id = value.id;
                const walls = value.walls;
                // start at the top and move right (Y) and down (X)
                const left = y * cellSize;
                const top = x * cellSize;

                ctx.fillStyle = "black";
                ctx.font = '20px Arial';

                // if there is wall to the top, draw it
                if (walls[0] === 0) {
                    ctx.fillRect(left, top, cellSize, 1);
                    //ctx.fillText(id, left, top+50);
                    if (id === start) {
                        ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
                        ctx.fillRect(left, top, 40, 40);
                    }
                    else if (id === end) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(left, top, 40, 40);
                    }
                }

                // if there is a wall to the bottom, draw it (2x thickness)
                if (walls[2] === 0) {
                    ctx.fillRect(left, top + cellSize - 1, cellSize, 1);
                    //ctx.fillText(id, left, top+50);
                    if (id === start) {
                        ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
                        ctx.fillRect(left, top, 40, 40);
                    }
                    else if (id === end) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(left, top, 40, 40);
                    }
                }

                // if not the starting cell and there is a boundary to the left, draw it
                if ((value.id !== 0) && walls[1] === 0) {
                    ctx.fillRect(left, top, 1, cellSize);
                    //ctx.fillText(id, left, top+50);
                    if (id === start) {
                        ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
                        ctx.fillRect(left, top, 40, 40);
                    }
                    else if (id === end) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(left, top, 40, 40);
                    }
                }

                // if not the last cell and there is a boundary to the right, draw it
                if ((value.id !== Object.keys(mazes).length - 1) && walls[3] === 0) {
                    ctx.fillRect(left + cellSize - 1, top, 1, cellSize);
                    //ctx.fillText(id, left, top+50);
                    if (id === start) {
                        ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
                        ctx.fillRect(left, top, 40, 40);
                    }
                    else if (id === end) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(left, top, 40, 40);
                    }
                }
            });
        };

        const total = [];
        total.push(0);
        const drawPath = (values, finalPath) => {
            let currentIndex = 1;
            
            const drawNextCell = () => {
                // return once drawing is over (base case)
                if (currentIndex >= (finalPath.length-1)) {
                    return;

                }

                // access the data of a cell on the path from values much like in mazeDraw (also get the midpoint this time)
                const pathCell = finalPath[currentIndex];
                console.log(pathCell);
                const value = values[pathCell];
                const z = pathTimes[currentIndex]
                total.push(z)

         
                ctx.fillStyle = "blue";
                const x = value.x;
                const y = value.y;
                const left = y * cellSize;
                const top = x * cellSize;
                ctx.fillRect(left + 20, top + 20, 3, 3);
                currentIndex ++;
                setTimeout(drawNextCell, (z) * 10000000);
            }

            drawNextCell();
        };


        const drawVisited = (values, visited) => {
            // recursively draws visited cells
            let currentIndex = 0;
      
            const drawVisited = () => {
              if (currentIndex >= visited.length) {
                finished = true;
                return;
              }
      
              const cellIndex = visited[currentIndex];
              const value = values[cellIndex];
              ctx.fillStyle = "rgba(0, 1, 0, 0.07)";
              const x = value.x;
              const y = value.y;
              const left = y * cellSize;
              const top = x * cellSize;
              ctx.fillRect(left, top, 40, 40);
      
              currentIndex++;
      
              setTimeout(drawVisited, (times[currentIndex]) * timer);
            };
      
            drawVisited();
          };

        // clear the whole page before drawing a new maze
        clearCanvas(); 

        // draw the maze, path and visited list
        if (mazes) {
            setTimeout(() => {
                drawMaze(values);
            }, 100);
        }

        if (visited) {
            setTimeout(() => {
                drawVisited(mazes, visited);
            }, 500)
        }
        
        const checkConditions = () => {
            // is drawVisited done and the path available?
            return paths && finished;
        };

        const executeCode = () => {
            // draw the path
            drawPath(values, paths);
        };
        

        const checkAndExecute = () => {
            if (checkConditions()) {
                executeCode();
            } else {
                setTimeout(checkAndExecute, 1000);
            }
        };

        checkAndExecute();

    }, [mazes, paths, visited, times, pathTimes]);

    return <canvas ref={canvasRef} width={2000} height={2000}></canvas>
}

export default Canvas;
