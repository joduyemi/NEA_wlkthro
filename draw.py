import turtle
import tkinter
import prims
#from PIL import Image, ImageFilter
import io
import os, sys

#home = os.environ['HOME']
window = tkinter.Tk()
canvas = tkinter.Canvas(master = window, width = 800, height = 800)
canvas.grid(padx=2, pady=2, row=0, column=0, rowspan=10, columnspan=10) # , sticky='nsew')
t = turtle.RawTurtle(canvas)

class rectMaze:
    '''
    Uses the prims mst to create and display the corresponding maze on the Tkinter canvas
    '''
    def __init__(self, n=10, sideLen=10):
        # defines the size of the maze
        self.n = n

        # defines size of each cell on the Tkinter canvas
        self.sideLen = sideLen

    def create_maze(self):
        '''
        creates and displays the maze
        '''
        pr = prims.RandomisedPrims(self.n)
        mst = pr.prims_mst()

        # start the x-coordinate essentially half of the way to the left of the midway point, so it will end up half of the way to the right 
        x = - (self.n / 2) * self.sideLen
        # start the y-coordinate at the positive equivalent of the x coordinate, for similar reasons
        y = - x
        t.penup()
        t.goto(x,y)

        for row in range(self.n):
            for col in range(self.n):
                node = row * self.n + col

                t.pendown()

                # if there is a wall to the top
                if mst[node][pr.TOP] == 1:
                    t.penup()

                # move forward by 'sideLen' units, then turn 90 degrees
                t.forward(self.sideLen)
                t.right(90)
                t.pendown()

                # if there is a wall to the right or it is the last node
                if mst[node][pr.RIGHT] == 1 or node == self.n **2 - 1:
                    t.penup()

                t.forward(self.sideLen)
                t.right(90)
                t.pendown()

                if mst[node][pr.BOTTOM] == 1:
                    t.penup()

                t.forward(self.sideLen)
                t.right(90)
                t.pendown()

                if mst[node][pr.LEFT] == 1 or node == 0:
                    t.penup()

                t.forward(self.sideLen)
                t.right(90)
                    
                # move the x-coordinate rightward by 'sideLen' units to be positioned to draw the next cell
                x += self.sideLen

                # go to the coordinates of the next cell
                t.penup()
                t.goto(x,y)
            # after reaching the end of the row, return the x-coordinate to where it started, and move the y-coordinate down to start the next one
            x -= self.sideLen * self.n
            y -= self.sideLen
            t.goto(x,y)
    def save_screen(self):
        ts = t.getscreen()
        cv = ts.getcanvas()
        cv.postscript(file="C:\\Users\\lolal\\Desktop\\All\\Wole\\NEA_wlkthro\\f.eps")
        im = "C:\\Users\\lolal\\Desktop\\All\\Wole\\NEA_wlkthro\\f.eps"
        eps_image = Image.open(im)
        img = eps_image.convert("RGB")
        img.save("C:\\Users\\lolal\\Desktop\\All\\Wole\\NEA_wlkthro\\f.jpg", lossless=True)
    

if __name__ == '__main__':
    t.pensize(2)
    t.hideturtle()
    t.speed(0)

    n = 8
    sideLen = 20

    rm = rectMaze(n, sideLen)
    # rm.create_square()
    # rm.create_grid()
    rm.create_maze()
    rm.save_screen()


    t.done()
