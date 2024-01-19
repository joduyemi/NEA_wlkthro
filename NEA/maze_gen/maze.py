from .draw import rectMaze
class Cell:
    def __init__(self, x, y, walls, id):
        '''
        gives each cell 4 properties - coordinates,  array of wall directions (anti-clockwise) and a unique id
        '''
        self.x = x
        self.y = y
        self.walls = walls
        self.id = id

    def serialise(self):
        '''
        simply returns the cell properties in a JSON format
        '''
        return {
            "x": self.x,
            "y": self.y,
            "walls": self.walls,
            "id":self.id,
        }

class Maze:
    def __init__(self, n, sideLen):
        '''
        defines the size of the maze
        '''
        self.n = n
        self.sideLen = sideLen
        self.my_maze = rectMaze(self.n, self.sideLen)
       


    def create_maze(self):
        '''
        creates and displays the maze
        '''
        self.my_maze.create_maze()
        self.pr = self.my_maze.pr
        self.mst = self.pr.prims_mst()
        #self.my_maze.save_screen()
    

    def serialise_cells(self):
        '''
        serialise all maze cells
        '''
        # will be used as the id parameter (simply incremented each iteration)
        count = 0

        serialised_cells = []
        # self.pr.total_nodes is the attribute of the mst that describes the total no. of cells
        for i in range(self.pr.total_nodes):
            x = self.pr.position[i][0]
            y = self.pr.position[i][1]
            # accesses the ith index of the mst (the 1s and 0s which describe whether a given direction has a path)
            walls = self.mst[i]

            # creates a Cell object with the above parameters, serialises it and adds it to the final array
            curr_cell = Cell(x, y, walls, count)
            curr_cell.serialise()
            serialised_cells.append(curr_cell.serialise())
            count += 1
        return serialised_cells
    
