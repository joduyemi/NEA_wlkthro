from prims import RandomisedPrims
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

class rectMaze:
    def __init__(self, n=10, sideLen=10):
        self.n = n
        self.sideLen = sideLen
        self.pr = RandomisedPrims(self.n)


    def create_maze(self):
        self.mst = self.pr.prims_mst()
    

    def serialise_cells(self):
        count = 0
        serialised_cells = []
        for i in range(self.pr.total_nodes):
            x = self.pr.position[i][0]
            y = self.pr.position[i][1]
            walls = self.mst[i]

            curr_cell = Cell(x, y, walls, count)
            curr_cell.serialise()
            serialised_cells.append(curr_cell.serialise())
            count += 1
        return serialised_cells
    



x = Cell(0, 2, [1, 0, 0, 1], 3)
print(x.serialise())