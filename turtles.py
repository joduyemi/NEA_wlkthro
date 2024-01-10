import random
def add_walls(grid):
    # loop through each column
    for i in range(len(grid)):
        # set first and last columns to walls
        if i == 0 or i == (len(grid)-1):
            for j in range(len(grid)):
                grid[i][j] = "w"
        # for the first and last rows,set all columns to walls
        else: 
            grid[i][0] = "w"
            grid[i][len(grid)-1] = "w"

def add_entrance(grid):
    grid[0][0] = "g"

def add_h_wall(grid, min_x, max_x, y):
    hole = random.randint(min_x, max_x)
    for i in range(min_x, max_x):
        if i == hole:
            grid[y][i] == ""
        else:
            grid[y][i] == "w" 

def add_inner_walls(grid, h, min_x, max_x, min_y, max_y, gate):
    if h:
        if max_x - min_x < 2:
            return
        y = (random.randint(min_y, max_y) // 2)
        add_h