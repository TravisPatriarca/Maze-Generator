class Kruskalmaze extends Maze {
    constructor(width, height, cells) {
        super(width, height, cells);
        this.cellSets = [];
        this.walls = [];
        this.cells.forEach((row, x) => {
            row.forEach((column, y) => {
                const cell = this.cells[x][y]
                if (x % 2 == 0 || y % 2 == 0) {
                    cell.wall = true;
                }
                if ((x % 2 == 0 ^ y % 2 == 0) && (y != 0 && y != this.yCells-1) && (x != 0 && x != this.xCells-1)) {
                    this.walls.push(this.cells[x][y]);
                }

                if (cell.wall == false) {
                    this.cellSets[String(cell.cellSet)] = [cell];

                }
            });
        });  

        this.walls = this.shuffle(this.walls);
    }

    increment() {
        if (this.walls.length > 0) {
            let wall        = this.walls.pop();
            let neighbours  = this.getNeighbors(wall.x, wall.y, this.cells, 1);
            neighbours      = neighbours.filter(neighbour => !neighbour.wall);
            let cell1       = neighbours[0];
            let cell2       = neighbours[1];

            if (cell1.cellSet != cell2.cellSet) {
                wall.wall = false;
                wall.cellSet = cell1.cellSet;
                this.cellSets[String(cell1.cellSet)].push(wall);
                
                this.visitCell(wall);
                this.visitCell(cell1);
                this.visitCell(cell2);

                const cell1Set = this.cellSets[String(cell1.cellSet)];
                const cell2Set = this.cellSets[String(cell2.cellSet)];
                let bigSet, smallSet, cellSet, col;
                if (cell1Set.length > cell2Set.length) {
                    bigSet = cell1Set;
                    smallSet = cell2Set;
                    cellSet = cell1.cellSet;
                }
                else
                {
                    bigSet = cell2Set;
                    smallSet = cell1Set;
                    cellSet = cell2.cellSet;
                }
                
                smallSet.forEach((cell, index) => {
                    cell.cellSet = cellSet
                    cell.draw();
                    bigSet.push(cell);
                });

                bigSet.push(wall);
                smallSet = [];
            }
        }
        else
        {
            this.finished = true;
        }
        
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
    }
}