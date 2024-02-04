import math
import queue
def dijkstra(maze, ids, start, end, new_walls):
    priority_queue = queue.PriorityQueue()

    # initialise the distance from each cell to the end as infinity to begin with
    distance = {cell:float('inf') for cell in ids}
    parent = {}
    row_len = int(math.sqrt(len(ids)))
    visited = []
    count = 0

    # change the distance from the start to the starting cell to 0
    distance[start] = 0
    # add the starting cell to the priortiy queue
    priority_queue.put((0, start))
    while not priority_queue.empty():
        count += 1
        # since this is a priority queue, 'current' will be the cell with minimum distance
        current_distance, cell = priority_queue.get()
        if cell == end:
            break
        no = 0
        for i in range(len(maze)):
            if maze[i]["id"] == cell:
                no = i
                # add the cell to the visited array
                visited.append(no)
                for j in range(4):
                    # calculate the id of the neighbouring cell(s) to which their are paths
                    if new_walls[no][j] == 1:
                        if j == 0:
                            neighbour = no - row_len
                        elif j == 1:
                            neighbour = no - 1
                        elif j == 2:
                            neighbour = no + row_len
                        elif j == 3:
                            neighbour = no + 1

                        if neighbour not in visited:
                            # gets the distance from the start to the current node and increments by 1
                            tentative_distance = current_distance + 1
                            # if new distance is less than old distance, update the distance 
                            if tentative_distance < distance[neighbour]:
                                distance[neighbour] = tentative_distance
                                # add the current node as its neighbour's parent
                                parent[neighbour] = cell
                                priority_queue.put((tentative_distance, neighbour))
                        else:
                            continue
                        
                    
    if end not in parent.keys():
        return None
    
    path = []
    current = end
    while current:
        path.append(current)
        current = parent[current]
    path.reverse()
    return path, visited


def euclidean_distance(node1, node2):
    x1, y1 = node1 % 6, node1 // 6
    x2, y2 = node2 % 6, node2 // 6
    return math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

def astar(maze, ids, start, end, new_walls):
    distances = {cell: float('inf') for cell in ids}
    g_values = {cell: float('inf') for cell in ids}
    parent = {}
    row_len = int(math.sqrt(len(ids)))
    visited = set()
    count = 0

    distances[start] = 0
    g_values[start] = 0
    to_visit = queue.PriorityQueue()
    to_visit.put((0, start))

    while not to_visit.empty():
        count += 1
        current_cost, current_node = to_visit.get()

        if current_node == end:
            print(count)
            break

        visited.add(current_node)

        for j in range(4):
            if new_walls[current_node][j] == 1:
                if j == 0:
                    neighbour = current_node - row_len
                elif j == 1:
                    neighbour = current_node - 1
                elif j == 2:
                    neighbour = current_node + row_len
                elif j == 3:
                    neighbour = current_node + 1

                tentative_g = g_values[current_node] + 1

                if tentative_g < g_values[neighbour]:
                    g_values[neighbour] = tentative_g
                    distances[neighbour] = tentative_g + euclidean_distance(neighbour, end)
                    parent[neighbour] = current_node
                    to_visit.put((distances[neighbour], neighbour))

    if end not in parent.keys():
        return None

    path = []
    current = end
    while current:
        path.append(current)
        current = parent.get(current, None)

    path.reverse()
    print(count)
    return path, list(visited)