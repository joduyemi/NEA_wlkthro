import math
import queue
def dijkstra(maze, ids, start, end, new_walls):
    distances = {cell: float('inf') for cell in ids}
    parent = {}
    row_len = int(math.sqrt(len(ids)))
    visited = []
    count = 0

    distances[start] = 0
    to_visit = [start]

    while to_visit:
        count += 1
        current_node = min(to_visit, key=lambda node: distances[node])  # Find node with the smallest distance
        to_visit.remove(current_node)

        if current_node == end:
            print(count)
            break

        visited.append(current_node)

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

                if neighbour not in visited:
                    tentative_distance = distances[current_node] + 1

                    if tentative_distance < distances[neighbour]:
                        distances[neighbour] = tentative_distance
                        parent[neighbour] = current_node
                        to_visit.append(neighbour)

    if end not in parent.keys():
        return None

    path = []
    current = end
    while current:
        path.append(current)
        current = parent.get(current, None)

    path.reverse()
    print(count)
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