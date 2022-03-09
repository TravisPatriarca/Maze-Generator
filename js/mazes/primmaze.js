class Primmaze extends Maze {
    constructor(width, height, cellSize) {
        super(width, height, cellSize);
        this.cells.forEach((row, x) => {
            row.forEach((column, y) => {
                const cell = this.cells[x][y]
                if (x % 2 == 0 || y % 2 == 0) {
                    cell.wall = true;
                }
            });
        });
        this.startX = round(this.xCells/2);
        this.startX += this.startX % 2 ^ 1;
        this.startY = round(this.yCells/2);
        this.startY += this.startY % 2 ^ 1;
        console.log({startX: this.startX, startY: this.startY})
        this.currentCell = this.cells[this.startX][this.startY];
        this.walls = this.getNeighbors(this.startX, this.startY, this.cells, 1);
        this.visitCell(this.currentCell);
        console.log(this.walls);
    }

    increment() {
        if (this.walls.length > 0) {
            const wallIndex = Math.floor(Math.random() * this.walls.length)
            const wall = this.walls[wallIndex];
            this.walls.splice(wallIndex, 1);
            const cells = this.getNeighbors(wall.x, wall.y, this.cells, 1).filter(neighbour => !neighbour.wall);
            if (cells.length > 1) {
                const unvisitedCell = cells.filter(neighbour => !neighbour.visited)[0];
                if (cells[0].visited ^ cells[1].visited) {
                    wall.wall = false;
                    this.visitCell(wall);

                    this.visitCell(unvisitedCell);
                    const nWalls = this.getNeighbors(unvisitedCell.x, unvisitedCell.y, this.cells, 1).filter(neighbour => neighbour.wall);;
                    this.walls.push(...nWalls)
                }
                
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