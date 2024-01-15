from maze import Maze
from dijkstra import dijkstra
import io
import contextlib
import ast

def generate_maze():
    '''
    Creates relevant classes and calls relevant functions to
    '''

    rm = Maze(7, 20)
    rm.create_maze()
    # creates buffer called 'f' to which stdout is redirected, then redirects the output of serialised_cells to it
    with contextlib.redirect_stdout(io.StringIO()) as f:
        print(rm.serialise_cells())
    # captures output
    new_maze = f.getvalue()
    # slices the string output
    new_maze = new_maze[1:len(new_maze)-2]
    # allows Python to do the work in determining the correct data structure for the data in the string
    new_maze = ast.literal_eval(new_maze)

    ids = [cell["id"] for cell in new_maze]
    walls = [cell["walls"] for cell in new_maze]
    end = len(new_maze) - 1

    dijkstra(new_maze, ids, 0, end, walls)


