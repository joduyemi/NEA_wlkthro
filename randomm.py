import numpy as np
import random

def generate_random(n):
    mst = [np.random.randint(0,2,4).tolist() for i in range(n**2)]
    for i in range(n):
        mst[i][0] = 0

    for i in range((n**2-n-1),(n**2)):
        mst[i][3] = 0

    
    return mst
print(generate_random(8)[7])