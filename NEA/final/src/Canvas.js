import React, { useState, useEffect, useRef } from 'react';

const Canvas = ({mazes, paths, visited, times, pathTimes, cumulative}) => {
    //console.log(paths);
    //console.log(visited);
    //console.log(times);
    //console.log(cumulative);
    // function to interactively display the maze
    // use a useRef hook to get the HTML canvas element of the DOM (outside of the useEffect to persist through rerenders)
    const canvasRef = useRef(null);
    useEffect(() => {
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

        const cellSize = 50;
        const middle = cellSize / 2;


        const drawMaze = (values) => {
            // recursively draws the maze
            values.forEach(value => {
                const x = value.x;
                const y = value.y;
                const walls = value.walls;
                // start at the top and move right (Y) and down (X)
                const left = y * cellSize;
                const top = x * cellSize;

                ctx.fillStyle = "black";

                // if there is wall to the top, draw it
                if (walls[0] === 0) {
                    ctx.fillRect(left, top, cellSize, 1);
                }

                // if there is a wall to the bottom, draw it (2x thickness)
                if (walls[2] === 0) {
                    ctx.fillRect(left, top + cellSize - 1, cellSize, 1);
                }

                // if not the starting cell and there is a boundary to the left, draw it
                if ((value.id != 0) && walls[1] === 0) {
                    ctx.fillRect(left, top, 1, cellSize);
                }

                // if not the last cell and there is a boundary to the right, draw it
                if ((value.id !== Object.keys(mazes).length - 1) && walls[3] === 0) {
                    ctx.fillRect(left + cellSize - 1, top, 1, cellSize);
                }
            });
        };

        const total_delay = new Array(0)
        const drawPath = (values, finalPath) => {
            let currentIndex = 0;
            
            const drawNextCell = () => {
                // return once drawing is over (base case)
                if (currentIndex >= (finalPath.length-1)) {
                    return;

                }

                // access the data of a cell on the path from values much like in mazeDraw (also get the midpoint this time)
                const pathCell = finalPath[currentIndex];
                const value = values[pathCell];
                const delay = (cumulative[times.indexOf(pathCell)]);
                total_delay.push(delay);
                //console.log(delay);
                ctx.fillStyle = "rgba(251, 255, 0, 0.8)";
                const x = value.x;
                const y = value.y;
                const left = y * cellSize;
                const top = x * cellSize;
                ctx.fillRect(left, top, 50, 50);
                currentIndex ++;
                setTimeout(drawNextCell, delay);
            }

            drawNextCell();
        };


        const drawVisited = (values, visited) => {
            let currentIndex = 0;
      
            const drawVisited = () => {
              if (currentIndex >= visited.length) {
                return;
              }
      
              const cellIndex = visited[currentIndex];
              const value = values[cellIndex];
              //console.log(times[currentIndex]);
              ctx.fillStyle = "rgba(0, 1, 0, 0.07)";
              const x = value.x;
              const y = value.y;
              const left = y * cellSize;
              const top = x * cellSize;
              ctx.fillRect(left, top, 50, 50);
      
              currentIndex++;
      
              setTimeout(drawVisited, (times[currentIndex]) * 100000);
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
        /*
        if (paths) {
            setTimeout(() => {
                drawPath(values, paths)
            }, 500)
        }*/

        ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
        ctx.fillRect(0, 0, 50, 50);
        ctx.fillStyle = "red";
        ctx.fillRect(700, 700, 50, 50);

    }, [mazes, paths, visited, times, pathTimes, cumulative])

    return <canvas ref={canvasRef} width={2000} height={2000}></canvas>
}

export default Canvas;
