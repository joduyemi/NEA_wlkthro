import React, { useEffect, useRef } from 'react';
import './App.css'; // Import your CSS file


const Canvas = ({ mazes, paths, visited }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element is not available.");
      return;
    }

    const ctx = canvas.getContext("2d");
    const cellSize = 50;
    const middle = cellSize / 2;

    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawMaze = (values) => {
      values.forEach(value => {
        const x = value.x;
        const y = value.y;
        const walls = value.walls;
        const left = y * cellSize;
        const top = x * cellSize;

        ctx.fillStyle = "black";

        if (walls[0] === 0) {
          ctx.fillRect(left, top, cellSize, 1);
        }

        if ((value.id !== 0) && walls[1] === 0) {
          ctx.fillRect(left, top, 1, cellSize);
        }

        if (walls[2] === 0) {
          ctx.fillRect(left, top + cellSize - 1, cellSize, 1);
        }

        if ((value.id !== Object.keys(mazes).length - 1) && walls[3] === 0) {
          ctx.fillRect(left + cellSize - 1, top, 1, cellSize);
        }
      });
    };

    const drawPath = (values, finalPath) => {
      let currentIndex = 0;

      const drawNextCell = () => {
        if (currentIndex >= finalPath.length) {
          return;
        }

        const cellIndex = finalPath[currentIndex];
        const value = values[cellIndex];
        ctx.fillStyle = "rgba(219, 173, 52, 0.66)";
        const x = value.x;
        const y = value.y;
        const left = y * cellSize;
        const top = x * cellSize;
        const midtop = top + middle;
        const midleft = left + middle;
        ctx.fillRect(left, top, 50, 50);
        canvasRef.current.classList.add('path-node');

        currentIndex++;

        setTimeout(drawNextCell, 720);
      };

      drawNextCell();
    };

    const drawVisited = (values, visited) => {
      console.log(visited);
      let currentIndex = 0;

      const drawVisited = () => {
        if (currentIndex >= visited.length) {
          return;
        }

        const cellIndex = visited[currentIndex];
        const value = values[cellIndex];
        ctx.fillStyle = "rgba(0, 1, 0, 0.07)";
        const x = value.x;
        const y = value.y;
        const left = y * cellSize;
        const top = x * cellSize;
        const midtop = top - middle + 10;
        const midleft = left - middle + 10;
        ctx.fillRect(left, top, 50, 50);

        currentIndex++;

        setTimeout(drawVisited, 100);
      };

      drawVisited();
    };


    clearCanvas();

    if (mazes) {
      setTimeout(() => {
        drawMaze(Object.values(mazes));
      }, 100);
    }

    if (visited) {
      setTimeout(() => {
        drawVisited(Object.values(mazes), visited);
      }, 500);
    }

    if (paths) {
      setTimeout(() => {
        drawPath(Object.values(mazes), paths);
      }, 500);
    }

  }, [mazes, paths, visited]);

  return <canvas ref={canvasRef} width={2000} height={2000}></canvas>;
};

export default Canvas;
