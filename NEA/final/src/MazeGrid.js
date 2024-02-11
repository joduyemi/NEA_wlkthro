import React, { useEffect, useRef } from 'react';

const MazeGrid = ({ mazeSize }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas element is not available.");
            return;
        }

        const ctx = canvas.getContext("2d");
        const cellSize = 50;
        const size = parseInt(mazeSize, 10); // Convert mazeSize to integer

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const drawMazeGrid = () => {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    const x = j * cellSize;
                    const y = i * cellSize;
                    const index = i * size + j;

                    ctx.beginPath();
                    ctx.rect(x, y, cellSize, cellSize);
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fill();
                    ctx.stroke();

                    // Display cell index
                    ctx.fillStyle = "black";
                    ctx.font = '12px Arial';
                    const textX = x + cellSize / 2 - 5;
                    const textY = y + cellSize / 2 + 5;
                    ctx.fillText(index, textX, textY);
                    ctx.closePath();
                }
            }
        };

        drawMazeGrid();
    }, [mazeSize]);

    return <canvas ref={canvasRef} width={2000} height={2000}></canvas>;
};

export default MazeGrid;
