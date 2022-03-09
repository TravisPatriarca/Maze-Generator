class Cell {
    constructor(x, y, cellSize) {
        this.wall = false;
        this.visited = false;
        this.cellSize = cellSize;
        this.x = x;
        this.y = y;
        this.xpos = x*cellSize;
        this.ypos = y*cellSize;
        this.colour = 0;
        this.colour2 = undefined;
        this.scale = 0
        this.finished = false;
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

    draw() {
        const x = this.x;
        const y = this.y;
        const cellSize = this.cellSize;
        if (this.visited) {
            //fill(!this.finished ? color(this.colour) : (this.wall ? 20: 200));
            //if (this.colour2 != undefined) {
            //    fill(color(this.colour2));
            //}
            fill(color(this.color));
            noStroke();
            //noSmooth();
            //rect(this.xpos + cellSize/2, this.ypos + cellSize/2, cellSize, cellSize);
            rect(this.xpos + cellSize/2* (1-this.scale), this.ypos + cellSize/2* (1-this.scale), cellSize * this.scale, cellSize * this.scale);
            this.scale = lerp(this.scale, 1, 0.2);   
        }

        // if (this.wall) {
        //     fill(0);
        //     //fill(!this.finished ? color(this.colour) : 255);
        //     noStroke();
        //     noSmooth();
        //     //rect(this.xpos + cellSize/2, this.ypos + cellSize/2, cellSize, cellSize);
        //     rect(this.xpos + cellSize/2* (1-this.scale), this.ypos + cellSize/2* (1-this.scale), cellSize * this.scale, cellSize * this.scale);
        //     this.scale = lerp(this.scale, 1, 0.2);
        // }

        // fill(125);
        // textAlign(CENTER, CENTER);
        // text(this.visited, this.xpos + this.cellSize/2, this.ypos + this.cellSize/2);
    }
}