class Dijkstra {
    constructor(xCells, yCells, cells, cellSize) {
        this.cells = cells;
        this.xCells = xCells;
        this.yCells = yCells;
        this.cellSize = cellSize;
        this.currentNode = undefined;
        this.startPos = undefined;
        this.endPos = undefined;
        this.running = false;
        this.cellsFilled = 0;
    }

    set startPosition(pos) {
        this.startPos = pos;
    }

    set endPosition(pos) {
        this.endPos = pos;
    }

    runnable() {
        if (this.endPos != undefined && this.startPos != undefined) {
            console.log({startPos: this.startPos, endPos: this.endPos})
            return true;
        }

        return false;
    }

    run() {
        this.currentNode = this.cells[this.startPos.x][this.startPos.y];
        this.running = true;

        this.unexploredSet = []
        this.cells.forEach((row, x) => {
            row.forEach((column, y) => {
                this.cells[x][y].minDis = Infinity;
                this.cells[x][y].parent = undefined;
                this.cells[x][y].pathed = false;
                if (!this.cells[x][y].wall) {
                    this.unexploredSet.push(this.cells[x][y]);
                }
            });
        });
        


        this.totalUnexploredCells = this.unexploredSet.length;

        this.currentNode.minDis = 0;

        console.log(this.cells[this.startPos.x][this.startPos.y])
        console.log(this.startPos.x*this.xCells+this.startPos.y)
    }

    increment() {
        if (this.running) {
            if (this.unexploredSet.length > 0) {
                let minDisCell = undefined;
                let minIndex = undefined;
                this.unexploredSet.forEach((cell, index) => {
                    if (minDisCell == undefined || cell.minDis < minDisCell.minDis) {
                        minDisCell = cell;
                        minIndex = index;
                    };
                });
                this.cellsFilled++;
                minDisCell.colour = "hsl(" + round(this.cellsFilled/this.totalUnexploredCells*360) + ", " + round(random(80, 90)) + "%, 50%)";;
                minDisCell.finished = false;
                minDisCell.draw();

                //const indexCell = minDisCell.x*this.xCells+minDisCell.y
                this.unexploredSet.splice(minIndex, 1);
                minDisCell.pathed = true;

                /*if (minDisCell.x == this.endPos.x && minDisCell.y == this.endPos.y) {
                    this.unexploredSet.length = [];
                }*/

                let neighbours = this.getNeighbors(minDisCell.x, minDisCell.y, this.cells, 1).filter(cell => !cell.wall && !cell.pathed)
                neighbours.forEach((neighbour, index) => {
                    const minDis = minDisCell.minDis+1;

                    if (minDis < neighbour.minDis) {
                        neighbour.minDis = minDis;
                        neighbour.parent = minDisCell;
                    }
                });
            }
        }
    }

    draw() {
        if (this.running) {
            const minDis = this.cells[this.endPos.x][this.endPos.y].minDis
            //if (this.unexploredSet.length <= 0) {
                this.cells.forEach((row, x) => {
                    row.forEach((column, y) => {
                        this.cells[x][y].colour2 = undefined;
                        if (this.cells[x][y].minDis <= minDis) {
                            this.cells[x][y].finished = false;
                            this.cells[x][y].draw();
                        }
                        else
                        {
                            this.cells[x][y].finished = true;
                            this.cells[x][y].draw();
                        }
                    })
                });
            //}

            let cell = this.cells[this.endPos.x][this.endPos.y]
            if (cell.parent != undefined) {
                while(cell.parent != undefined) {
                    cell.finished = false;
                    cell.colour2 = "hsl(" + round(230+cell.minDis/minDis*130) + ", 80%, 50%)";
                    cell.draw();
                    cell = cell.parent;
                }
            }
        }

        if (this.startPos != undefined) {
            fill(20,0,255)
            rect(this.startPos.x*this.cellSize, this.startPos.y*this.cellSize, this.cellSize, this.cellSize);
        }

        if (this.endPos != undefined) {
            fill(255,20,0)
            rect(this.endPos.x*this.cellSize, this.endPos.y*this.cellSize, this.cellSize, this.cellSize);
        }
    }

    checkBounds(x, y, cells) {
        if (x < 0 || x >= this.xCells || y < 0 || y >= this.yCells) {
            return false;
        }
        return true;
    }

    getNeighbors(x, y, cells, dis) {
        let neighbors = [];
        if (this.checkBounds(x - dis, y, cells)) {
            neighbors.push(cells[x - dis][y]);
        }
        if (this.checkBounds(x + dis, y, cells)) {
            neighbors.push(cells[x + dis][y]);
        }
        if (this.checkBounds(x, y - dis, cells)) {
            neighbors.push(cells[x][y - dis]);
        }
        if (this.checkBounds(x, y + dis, cells)) {
            neighbors.push(cells[x][y + dis]);
        }
        return neighbors;
    }
}