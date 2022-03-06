class Maze {
    constructor(width, height, cellSize) {
        this.width          = width;
        this.height         = height;
        this.xCells         = Math.ceil(width / cellSize);
        this.yCells         = Math.ceil(height / cellSize);
        this.cellSize       = cellSize;
        this.visitedCells   = [];
        this.cellCount      = this.xCells*this.yCells;
        this.fillNum        = 0;
        this.cells          = this.iniCells(this.xCells, this.yCells, this.cellSize);
        this.currentCell    = this.cells[0][0];
        this.cellSets = []
        // kruskal
        this.edges = [];
        this.cells.forEach((row, x) => {
            row.forEach((column, y) => {
                this.cells[x][y].walls.forEach((wall, i)  => {
                    this.edges.push({
                        x, 
                        y,
                        direction: i,
                        cellSetId: x*y+y
                    });
                });

                this.cellSets[x*y+y] = [this.cells[x][y]];
            });
        });

        //shuffle(this.edges);
    }

    iniCells(xCells, yCells, cellSize) {
        let cells = []
        for (let x = 0; x < xCells; x++) {
            let row = [];
            for (let y = 0; y < yCells; y++) {
                row.push(new Cell(x, y, cellSize));
            }
            cells.push(row);
        }

        return cells
    }

    getCellMeeting(cell, wallDirection) {
        const x = cell.x;
        const y = cell.y;

        switch (wallDirection) {
            case 0:
                if (this.checkBounds(x, y-1, this.cells)) {
                    return this.cells[x][y-1]
                }
            case 1:
                if (this.checkBounds(x+1, y, this.cells)) {
                    return this.cells[x+1][y]
                }
            case 2:
                if (this.checkBounds(x, y+1, this.cells)) {
                    return this.cells[x][y+1]
                }
            case 3:
                if (this.checkBounds(x-1, y, this.cells)) {
                    return this.cells[x-1][y]
                }
        }

        return undefined;
    }

    incrementDFS() {
        if (this.visitedCells.length > 0) {
            let neighbours  = this.getNeighbors(this.currentCell.x, this.currentCell.y, this.cells);
            neighbours      = neighbours.filter(neighbour => !neighbour.visited)
            if (neighbours.length > 0) {
                const randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
                this.currentCell.walls[this.currentCell.getWallMeeting(randomNeighbour)] = false;
                randomNeighbour.walls[randomNeighbour.getWallMeeting(this.currentCell)] = false;
                this.currentCell = randomNeighbour;
                this.visitCell(this.currentCell, this.visitedCells);
            }
            else
            {
                this.currentCell = this.visitedCells.pop();
            }
        }
    }

    incrementKruskal() {
        if (this.edges.length > 0) {
            const edge = this.edges.pop();
            const cell = this.cells[edge.x][edge.y]
            const nCell = this.getCellMeeting(this.cells[edge.x][edge.y], edge.direction);

            if (typeof nCell !== 'undefined') {
                if (!this.cellSets[edge.cellSetId].includes(nCell)) {
                    this.visitCell(cell);
                    this.visitCell(nCell);

                    cell.walls[cell.getWallMeeting(nCell)] = false;
                    nCell.walls[nCell.getWallMeeting(cell)] = false;
                }
            }
        }
    }

    visitCell(cell) {
        cell.visited    = true;
        cell.filled     = true;
        cell.colour     = "hsl(" + round(this.fillNum/this.cellCount*360) + ", " + round(random(80, 90)) + "%, 50%)";

        cell.draw(true);
    
        this.fillNum++;
        this.visitedCells.push(cell); 
    
        let neighbours = this.getNeighbors(cell.x, cell.y, this.cells);
        neighbours.forEach((neighbour) => {
            neighbour.draw(true);
        }) 
    }

    checkBounds(x, y, cells) {
        if (x < 0 || x >= cells.length || y < 0 || y >= cells[0].length) {
            return false;
        }
        return true;
    }
    
    getNeighbors(x, y, cells) {
        let neighbors = [];
        if (this.checkBounds(x - 1, y, cells)) {
            neighbors.push(cells[x - 1][y]);
        }
        if (this.checkBounds(x + 1, y, cells)) {
            neighbors.push(cells[x + 1][y]);
        }
        if (this.checkBounds(x, y - 1, cells)) {
            neighbors.push(cells[x][y - 1]);
        }
        if (this.checkBounds(x, y + 1, cells)) {
            neighbors.push(cells[x][y + 1]);
        }
        return neighbors;
    }
}