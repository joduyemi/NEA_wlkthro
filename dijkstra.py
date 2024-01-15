import math
import queue
test_data = ({'x': 0, 'y': 0, 'walls': [0, 0, 1, 0], 'id': 0}, {'x': 0, 'y': 1, 'walls': [0, 0, 1, 0], 'id': 1}, {'x': 0, 'y': 2, 'walls': [0, 0, 1, 0], 'id': 2}, {'x': 0, 'y': 3, 'walls': [0, 0, 1, 1], 'id': 3}, {'x': 0, 'y': 4, 'walls': [0, 1, 0, 0], 'id': 4}, {'x': 1, 'y': 0, 'walls': [1, 0, 1, 1], 'id': 5}, {'x': 1, 'y': 1, 'walls': [1, 1, 1, 1], 'id': 6}, {'x': 1, 'y': 2, 'walls': [1, 1, 0, 1], 'id': 7}, {'x': 1, 'y': 3, 'walls': [1, 1, 0, 1], 'id': 8}, {'x': 1, 'y': 4, 'walls': [0, 1, 0, 0], 'id': 9}, {'x': 2, 'y': 0, 'walls': [1, 0, 1, 0], 'id': 10}, {'x': 2, 'y': 1, 'walls': [1, 0, 0, 1], 'id': 11}, {'x': 2, 'y': 2, 'walls': [0, 1, 0, 1], 'id': 12}, {'x': 2, 'y': 3, 'walls': [0, 1, 1, 1], 'id': 13}, {'x': 2, 'y': 4, 'walls': [0, 1, 1, 0], 'id': 14}, {'x': 3, 'y': 0, 'walls': [1, 0, 1, 1], 'id': 15}, {'x': 3, 'y': 1, 'walls': [0, 1, 0, 0], 'id': 16}, {'x': 3, 'y': 2, 'walls': [0, 0, 0, 1], 'id': 17}, {'x': 3, 'y': 3, 'walls': [1, 1, 1, 0], 'id': 18}, {'x': 3, 'y': 4, 'walls': [1, 0, 1, 0], 'id': 19}, {'x': 4, 'y': 0, 'walls': [1, 0, 0, 0], 'id': 20}, {'x': 4, 'y': 1, 'walls': [0, 0, 0, 1], 'id': 21}, {'x': 4, 'y': 2, 'walls': [0, 1, 0, 1], 'id': 22}, {'x': 4, 'y': 3, 'walls': [1, 1, 0, 0], 'id': 23}, {'x': 4, 'y': 4, 'walls': [1, 0, 0, 0], 'id': 24})
ids = [cell["id"] for cell in test_data]
walls = [cell["walls"] for cell in test_data]
end = len(test_data) - 1
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
    priority_queue.put((start, 0))
    while not priority_queue.empty():
        count += 1
        # since this is a priority queue, 'current' will be the cell with minimum distance
        current = priority_queue.get()
        if current[0] == end:
            break
        no = 0
        for i in range(len(maze)):
            if maze[i]["id"] == current[0]:
                no = i
                # add the cell to the visited array
                visited.append(no)
                print(visited)
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
                            tentative_distance = current[1] + 1
                            # if new distance is less than old distance, update the distance 
                            if tentative_distance < distance[neighbour]:
                                distance[neighbour] = tentative_distance
                                # add the current node as its neighbour's parent
                                parent[neighbour] = current[0]
                                priority_queue.put((neighbour, tentative_distance))
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
    return path
    
print(dijkstra(test_data, ids, 0, end, walls))