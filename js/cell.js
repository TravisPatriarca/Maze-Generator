class Cell {
    constructor(x, y, cellSize) {
        this.walls = [true, true, true, true];
        this.filled = false
        this.visited = false;
        this.cellSize = cellSize;
        this.x = x;
        this.y = y;
        this.xpos = x*cellSize;
        this.ypos = y*cellSize;
        this.colour = undefined;
        this.scale = 0
    }

    getWallMeeting(otherCell) {
        if (this.x == otherCell.x) {
            if (this.y < otherCell.y) {
                return 2;
            } else {
                return 0;
            }
        } else {
            if (this.x < otherCell.x) {
                return 1;
            } else {
                return 3;
            }
        }
    }

    draw(outline=false) {
        const x = this.x;
        const y = this.y;
        const cellSize = this.cellSize;
        if (this.filled) {
            fill(color(this.colour));
            noStroke();
            noSmooth();
            rect(this.xpos/* + cellSize/2* (1-this.scale)*/, this.ypos/* + cellSize/2* (1-this.scale)*/, cellSize/* * this.scale*/, cellSize /** this.scale*/);
            //this.scale = lerp(this.scale, 1, 0.2);
            
            if (outline && cellSize > 2) {
                stroke(30);
                if (this.walls[0]) { //top
                    line(x * cellSize, y * cellSize, x * cellSize + cellSize, y * cellSize);
                }
                if (this.walls[1]) { //right
                    line(x * cellSize + cellSize, y * cellSize, x * cellSize + cellSize, y * cellSize + cellSize);
                }
                if (this.walls[2]) { //bottom
                    line(x * cellSize, y * cellSize + cellSize, x * cellSize + cellSize, y * cellSize + cellSize);
                }
                if (this.walls[3]) { //left
                    line(x * cellSize, y * cellSize, x * cellSize, y * cellSize + cellSize);
                }
            }
        }
    }
}