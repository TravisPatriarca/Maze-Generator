class Dfsmaze extends Maze {
    constructor(width, height, cells) {
        super(width, height, cells);

        this.forEachCell((cell) => {
            if (cell.x % 2 == 0 || cell.y % 2 == 0) {
                cell.wall = true;
            }
        });

        this.currentCell    = this.cells[1][1];
        this.visitCell(this.currentCell, this.visitedCells)
    }

    increment() {
        if (this.visitedCells.length > 0) {
            let neighbours  = this.getNeighbors(this.currentCell.x, this.currentCell.y, this.cells, 2);
            neighbours      = neighbours.filter(neighbour => !neighbour.visited)
            if (neighbours.length > 0 && !this.currentCell.wall) {
                const randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];

                if (this.currentCell.visited) {
                    this.visitCell(this.currentCell);
                }

                let wall = this.getWallBetween(this.currentCell, randomNeighbour)
                this.visitCell(wall);

                this.currentCell = randomNeighbour;
                this.visitCell(this.currentCell);
                
            }
            else
            {
                if (this.currentCell.wall) {
                    this.currentCell.wall = false;
                }
                this.currentCell.finished = true;
                this.currentCell.draw();
                this.currentCell = this.visitedCells.pop();
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
                }
            }
        }
    }

    visitCell(cell) {
        super.visitCell(cell);
        this.visitedCells.push(cell);
    }
}