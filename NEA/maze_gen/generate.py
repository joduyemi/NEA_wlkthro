from .maze import Maze
from .dijkstra import dijkstra
import io
import contextlib
import ast
import json

def generate_maze(n, sideLen):
    '''
    Creates relevant classes and calls relevant functions to generate maze and corresponding path using dijkstra
    '''

    rm = Maze(n, sideLen)
    rm.create_maze()
    with contextlib.redirect_stdout(io.StringIO()) as f:
        print(rm.serialise_cells())
    # creates buffer called 'f' to which stdout is redirected, then redirects the output of serialised_cells to it
    # captures output
    maze_data = json.dumps(f.getvalue())
    new_maze = f.getvalue()
    # slices the string output
    new_maze = new_maze[1:len(new_maze)-2]
    # allows Python to do the work in determining the correct data structure for the data in the string
    new_maze = ast.literal_eval(new_maze)

    ids = [cell["id"] for cell in new_maze]
    walls = [cell["walls"] for cell in new_maze]
    end = len(new_maze) - 1

    # find the maze-solving path
    path_data = json.dumps(dijkstra(new_maze, ids, 0, end, walls))
    # adds both the original maze data and the solved path data in json format to the final return object
    data = []
    data.append(maze_data)
    data.append(path_data)

    return data

