import random

class RandomisedPrims:
    '''
    Creates a minimum spanning tree (MST) for square graph
    with every node (except on the boundary) having 4 neigbours
    '''

    def __init__(self, row_len):
        self.row_len = row_len

        # being a square maze, row_len = col_len, hence:
        self.total_nodes = row_len**2

        # define each direction going anti-clockwise (index of a neigbouring node in the adjacency list)
        self.TOP = 0
        self.LEFT = 1
        self.BOTTOM = 2
        self.RIGHT = 3

        # array of 2-length arrays which give the coordinates of each node

        self.position = [
            [0, 0] for i in range(self.total_nodes)
        ]

    def prims_mst(self):
        # creates MST, initially with no edges, represented similar to an adjacency list

        mst = [
            [0, 0, 0, 0] for i in range(self.total_nodes)
        ]

        # list of nodes to visit
        to_visit = [node for node in range(self.total_nodes)]


        # visit the first node
        node = to_visit[0]
        visited = [node]
        to_visit.remove(node)

        while len(to_visit) > 0:
            # for all the visited nodes, randomly pick an outgoing edge to an unvisited node
            # set used to shuffle the edges_pool

            edges_pool = list(set(self.edges_to_unvisited_nodes(visited)))

            # pick a random edge
            for i in range(10):
                random.shuffle(edges_pool)
            edge = random.choice(edges_pool)
            node, next_node = edge

            # connect these two nodes in the MST
            direction = self.get_neighbour_dir(node, next_node)
            mst[node][direction] = 1

            # also connect them in reverse
            neighbour_dir = self.get_neighbour_dir(next_node, node)
            mst[next_node][neighbour_dir] = 1

            # remove this next_node from unvisited and add to visited
            visited.append(next_node)
            to_visit.remove(next_node)

        self.find_pos()
        #print(self.position)

        return mst

    def edges_to_unvisited_nodes(self, visited):
        '''
        returns all edges coming from already visited nodes towards unvisited ones
        '''
        edges_pool = []

        for node in visited:
            # add this node's edges to the pool

            row = node // self.row_len
            col = node % self.row_len # for example, node 15 for a 4x4 maze would return 15 % 4 = 3 hence the 4th column

            if row > 0:
                # ie not in the top row above which there is nothing
                # add the edge node, top_node to edges_pool if not visited
                top_node = node - self.row_len
                if top_node not in visited:
                    edges_pool.append((node, top_node))

            if col > 0:
                # ie not the first to the left of which there is nothing
                left_node = node - 1
                if left_node not in visited:
                    edges_pool.append((node, left_node))

            if row < self.row_len - 1:
                # all rows except last have bottom neighbours
                bottom_node = node + self.row_len
                if bottom_node not in visited:
                    edges_pool.append((node, bottom_node))

            if col < self.row_len - 1:
                # all columns except last have right neighbours
                right_node = node + 1
                if right_node not in visited:
                    edges_pool.append((node, right_node))

        return edges_pool

    def get_neighbour_dir(self, node, next_node):
        '''
        always returns the direction of next_node from node (in that order)
        '''
        if node - self.row_len == next_node:
            # next_node is the top_node to node
            return self.TOP
        if node - 1 == next_node:
            return self.LEFT
        if node + self.row_len == next_node:
            return self.BOTTOM
        if node + 1 == next_node:
            return self.RIGHT
        
    def find_pos(self):
        for node in range(self.total_nodes):
            row = node // self.row_len
            col = node % self.row_len

            self.position[node][0] = row
            self.position[node][1] = col
