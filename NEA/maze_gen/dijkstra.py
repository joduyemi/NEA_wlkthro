import math
import queue
import time

sample = [({'x': 0, 'y': 0, 'walls': [0, 0, 1, 1], 'id': 0}, {'x': 0, 'y': 1, 'walls': [0, 1, 1, 1], 'id': 1}, {'x': 0, 'y': 2, 'walls': [0, 1, 1, 0], 'id': 2}, {'x': 0, 'y': 3, 'walls': [0, 0, 1, 1], 'id': 3}, {'x': 0, 'y': 4, 'walls': [0, 1, 1, 1], 'id': 4}, {'x': 0, 'y': 5, 'walls': [0, 1, 0, 0], 'id': 5}, {'x': 1, 'y': 0, 'walls': [1, 0, 1, 0], 'id': 6}, {'x': 1, 'y': 1, 'walls': [1, 0, 0, 0], 'id': 7}, {'x': 1, 'y': 2, 'walls': [1, 0, 0, 1], 'id': 8}, {'x': 1, 'y': 3, 'walls': [1, 1, 0, 0], 'id': 9}, {'x': 1, 'y': 4, 'walls': [1, 0, 0, 1], 'id': 10}, {'x': 1, 'y': 5, 'walls': [0, 1, 0, 0], 'id': 11}, {'x': 2, 'y': 0, 'walls': [1, 0, 1, 1], 'id': 12}, {'x': 2, 'y': 1, 'walls': [0, 1, 1, 1], 'id': 13}, {'x': 2, 'y': 2, 'walls': [0, 1, 1, 1], 'id': 14}, {'x': 2, 'y': 3, 'walls': [0, 1, 0, 1], 'id': 15}, {'x': 2, 'y': 4, 'walls': [0, 1, 1, 1], 'id': 16}, {'x': 2, 'y': 5, 'walls': [0, 1, 0, 0], 'id': 17}, {'x': 3, 'y': 0, 'walls': [1, 0, 1, 0], 'id': 18}, {'x': 3, 'y': 1, 'walls': [1, 0, 1, 0], 'id': 19}, {'x': 3, 'y': 2, 'walls': [1, 0, 0, 1], 'id': 20}, {'x': 3, 'y': 3, 'walls': [0, 1, 0, 0], 'id': 21}, {'x': 3, 'y': 4, 'walls': [1, 0, 0, 1], 'id': 22}, {'x': 3, 'y': 5, 'walls': [0, 1, 0, 0], 'id': 23}, {'x': 4, 'y': 0, 'walls': [1, 0, 1, 0], 'id': 24}, {'x': 4, 'y': 1, 'walls': [1, 0, 0, 1], 'id': 25}, {'x': 4, 'y': 2, 'walls': [0, 1, 0, 1], 'id': 26}, {'x': 4, 'y': 3, 'walls': [0, 1, 0, 0], 'id': 27}, {'x': 4, 'y': 4, 'walls': [0, 0, 1, 1], 'id': 28}, {'x': 4, 'y': 5, 'walls': [0, 1, 0, 0], 'id': 29}, {'x': 5, 'y': 0, 'walls': [1, 0, 0, 1], 'id': 30}, {'x': 5, 'y': 1, 'walls': [0, 1, 0, 1], 'id': 31}, {'x': 5, 'y': 2, 'walls': [0, 1, 0, 1], 'id': 32}, {'x': 5, 'y': 3, 'walls': [0, 1, 0, 1], 'id': 33}, {'x': 5, 'y': 4, 'walls': [1, 1, 0, 1], 'id': 34}, {'x': 5, 'y': 5, 'walls': [0, 1, 0, 0], 'id': 35}), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 35, [[0, 0, 1, 1], [0, 1, 1, 1], [0, 1, 1, 0], [0, 0, 1, 1], [0, 1, 1, 1], [0, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 0, 0], [1, 0, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 0, 1], [0, 1, 1, 1], [0, 1, 0, 0], [1, 0, 1, 0], [1, 0, 1, 0], [1, 0, 0, 1], [0, 1, 0, 0], [1, 0, 0, 1], [0, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 1], [0, 1, 0, 1], [0, 1, 0, 0], [0, 0, 1, 1], [0, 1, 0, 0], [1, 0, 0, 1], [0, 1, 0, 1], [0, 1, 0, 1], [0, 1, 0, 1], [1, 1, 0, 1], [0, 1, 0, 0]]]

def dijkstra(maze, ids, start, end, new_walls):
    priority_queue = queue.PriorityQueue()

    # initialise the distance from each cell to the end as infinity to begin with
    distance = {cell:float('inf') for cell in ids}
    parent = {}
    row_len = int(math.sqrt(len(ids)))
    visited = {}
    count = 0
    start_time = time.perf_counter()

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

        for i in range(len(maze)): 
            visited[cell] = time.perf_counter() - start_time
            for j in range(4):
                # calculate the id of the neighbouring cell(s) to which their are paths
                if new_walls[cell][j] == 1:
                    if j == 0:
                        neighbour = cell - row_len
                    elif j == 1:
                        neighbour = cell - 1
                    elif j == 2:
                        neighbour = cell + row_len
                    elif j == 3:
                        neighbour = cell + 1

                    if neighbour not in visited.keys():
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
    
    path = {}
    x_time = time.perf_counter()
    current = end
    while current:
        path[current] = time.perf_counter() - x_time
        current = parent.get(current, None)
    res = dict(reversed(list(path.items())))
    return list(res.keys()), list(path.values()), list(visited.keys()), list(visited.values())


def euclidean_distance(node1, node2, row_len):
    x1, y1 = node1 % row_len, node1 // row_len
    x2, y2 = node2 % row_len, node2 // row_len
    return math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

def astar(maze, ids, start, end, new_walls):
    distances = {cell: float('inf') for cell in ids}
    g_values = {cell: float('inf') for cell in ids}
    parent = {}
    row_len = int(math.sqrt(len(ids)))
    visited = {}
    count = 0
    start_time = time.perf_counter()

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

        visited[current_node] = (time.perf_counter() - start_time)

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
                    distances[neighbour] = tentative_g + euclidean_distance(neighbour, end, row_len)
                    parent[neighbour] = current_node
                    to_visit.put((distances[neighbour], neighbour))

    if end not in parent.keys():
        return None
        

    # calculate the path and the time taken to find each path cell, storing as key value pairs
    path = {}
    x_time = time.perf_counter()
    current = end
    while current:
        path[current] = (time.perf_counter() - x_time)
        current = parent.get(current, None)

    res = dict(reversed(list(path.items())))
    print(count)
    return list(res.keys()), list(path.values()), list(visited.keys()), list(visited.values())

print(dijkstra(sample[0], sample[1], 0, sample[2], sample[3]))
print(astar(sample[0], sample[1], 0, sample[2], sample[3]))