import React, { useState, useEffect, useRef } from 'react';

const Canvas = ({mazes, paths}) => {
    // function to interactively display the maze

    // use a useRef hook to get the HTML canvas element of the DOM (outside of the useEffect to persist through rerenders)
    const canvasRef = useRef(null);
    // define a variable to check if the maze is drawn
    const [mazeDrawn, setMazeDrawn] = useState(false);
    useEffect(() => {
        // always references CURRENT value of canvasRef, provided it exists
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas element is not available. ");
            return;
        }
        
        const values = Object.values(mazes);

        let ctx = canvas.getContext("2d");
        const clearCanvas = () => {
            ctx = canvas.getContext("2d");
            ctx.save();
            ctx.globalCompositeOperation = 'copy';
            ctx.strokeStyle = 'transparent';
            ctx.beginPath();
            ctx.lineTo(0, 0);
            ctx.stroke();
            ctx.restore();
        };

        const cellSize = 25;
        const middle = cellSize / 2;


        const drawMaze = (values, index = 0) => {
            // recursively draws the maze
            // stops when there are no more cells
            if (index >= values.length) {
                setMazeDrawn(true);
                drawPath(values, paths);
                return;
            }
            const value = values[index];
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


            requestAnimationFrame(() => {
                drawMaze(values, index + 1);
            });
        }

        const drawPath = (values, finalPath) => {
            // don't draw path until maze finished
                setTimeout(() =>{
                    drawPath(values, paths);
                }, 100)

            let currentIndex = 0;
            const drawNextCell = () => {
                // return once drawing is over (base case)
                if (currentIndex >= finalPath.length) {
                    return;

                }

                // access the data of a cell on the path from values much like in mazeDraw (also get the midpoint this time)
                const cellIndex = finalPath[currentIndex];
                const value = values[cellIndex];
                ctx.fillStyle = "blue";
                const x = value.x;
                const y = value.y;
                const left = y * cellSize;
                const top = x * cellSize;
                const midtop = top + middle;
                const midleft = left + middle;
                ctx.fillRect(midleft, midtop, 3, 3);
                currentIndex ++;

                setTimeout(() => {
                    drawNextCell();
                }, 100)
            }

            drawNextCell();
        }

        
        // only initiate the process if the maze data is available
        if (mazes) {
            drawMaze(values);
        }
        clearCanvas();

    }, [mazes, paths])

    return <canvas ref={canvasRef} width={2000} height={2000}></canvas>
}

export default Canvas;
