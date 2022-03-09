class Divisionmaze extends Maze {
    constructor(width, height, cellSize) {
        super(width, height, cellSize);
        for (let x=0; x<this.xCells; x++) {
            for (let y=0; y<this.yCells; y++) {
                this.cells[x][y].scale = 1;
                this.cells[x][y].visited = true;
                this.cells[x][y].finished = true;
                //if (y==0 || x==0 || y==this.yCells-1 || x == this.xCells-1) {
                //    this.cells[x][y].wall = true;
                //}
                this.cells[x][y].draw();
            }
        }
        //this.cutDirection = "vertical";
        this.spaces = [{x1: 0, y1: 0, x2: this.xCells-1, y2: this.yCells-1,
            cutPos: undefined, previousDir: "horizontal"}];
    }

    increment() {
        if (this.spaces.length > 0) {
            const spaceIndex = Math.floor(Math.random() * this.spaces.length)
            const space = this.spaces[spaceIndex];
            this.spaces.splice(spaceIndex, 1);
    
            let cutPos;
            const cutDirection = space.previousDir == "horizontal" ? "vertical" : "horizontal"
            switch(cutDirection) {
                case "vertical":
                    cutPos = this.cutVertical(space);
                    if (cutPos-space.x1 > 2) {
                        this.spaces.push({
                            x1: space.x1,
                            y1: space.y1,
                            x2: cutPos-1,
                            y2: space.y2,
                            cutPos,
                            previousDir: "vertical"
                        });
                    }

                    if (space.x2-cutPos > 2) {
                    this.spaces.push({
                            x1: cutPos+1,
                            y1: space.y1,
                            x2: space.x2,
                            y2: space.y2,
                            cutPos,
                            previousDir: "vertical"
                        });
                    }
                    break;
                case "horizontal": 
                    cutPos = this.cutHorizontal(space);
                    if (cutPos-space.y1 > 2) {
                        this.spaces.push({
                            x1: space.x1,
                            y1: space.y1,
                            x2: space.x2,
                            y2: cutPos-1,
                            cutPos,
                            previousDir: "horizontal"
                        });
                    }

                    if (space.y2-cutPos > 2) {
                    this.spaces.push({
                            x1: space.x1,
                            y1: cutPos+1,
                            x2: space.x2,
                            y2: space.y2,
                            cutPos,
                            previousDir: "horizontal"
                        });
                    }
            }
        }
        else
        {
            this.finished = true;
        }
    };

    cutVertical(space) {
        //let xpos = this.randomIntRange(space.x1, space.x2)
        let xpos = space.x1 + round((space.x2 - space.x1)/2);
        xpos += xpos % 2 ^ 1;
        let gappos = this.randomIntRange(space.y1+1, space.y2-1)
        gappos = Math.round(gappos / 2) * 2

        this.cells.forEach((row, x) => {
            row.forEach((column, y) => {
                if (x == xpos && y != gappos && y >= space.y1 && y <= space.y2) {
                    this.cells[x][y].wall = true;
                    this.cells[x][y].finished = false;
                    this.cells[x][y].scale = 0;
                    this.visitCell(this.cells[x][y]);
                }
            });
        });

        return xpos;
    }

    cutHorizontal(space) {
        //let ypos = this.randomIntRange(space.y1, space.y2)
        let ypos = space.y1 + round((space.y2 - space.y1)/2);
        ypos += ypos % 2 ^ 1;
        let gappos = this.randomIntRange(space.x1+1, space.x2-1)
        gappos = Math.round(gappos / 2) * 2

        this.cells.forEach((row, x) => {
            row.forEach((column, y) => {
                if (y == ypos && x != gappos && x >= space.x1 && x <= space.x2) {
                    this.cells[x][y].wall = true;
                    this.cells[x][y].finished = false;
                    this.cells[x][y].scale = 0;
                    this.visitCell(this.cells[x][y]);
                }
            });
        });

        return ypos;
    }

    draw() {
        for (let x=0; x<this.xCells; x++) {
            for (let y=0; y<this.yCells; y++) {
                if (this.cells[x][y].visited && this.cells[x][y].scale < 0.999) {
                    this.cells[x][y].draw();
                    if (this.cells[x][y].scale > 0.98) {
                        this.cells[x][y].finished = true;
                    }
                }
            }
        }
    };
}