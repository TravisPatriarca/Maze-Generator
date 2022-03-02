class Maze {
    constructor(width, height, cellSize) {
        this.width          = width;
        this.height         = height;
        this.xCells         = Math.ceil(width / cellSize);
        this.yCells         = Math.ceil(height / cellSize);
        this.cellSize       = cellSize;
        this.visitedCells   = [];
        this.currentCell    = undefined;
        this.cellCount      = xCells*yCells;

        iniCells(this.xCells, this.yCells, this.cellSize)
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

    increment() {

    }

    visitCell(cell) {
        cell.visited = true;
        cell.filled = true;
        cell.colour = "hsl(" + round(fillNum/cellCount*360) + ", " + round(random(80, 90)) + "%, 50%)";
        cell.draw(true);
    
        
        fillNum++;
        this.visitedCells.push(cell); 
    
        let neighbours = getNeighbors2(cell.x, cell.y, cells);
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
        if (checkBounds(x - 1, y, cells) && !cells[x - 1][y].visited) {
            neighbors.push(cells[x - 1][y]);
        }
        if (checkBounds(x + 1, y, cells) && !cells[x + 1][y].visited) {
            neighbors.push(cells[x + 1][y]);
        }
        if (checkBounds(x, y - 1, cells) && !cells[x][y - 1].visited) {
            neighbors.push(cells[x][y - 1]);
        }
        if (checkBounds(x, y + 1, cells) && !cells[x][y + 1].visited) {
            neighbors.push(cells[x][y + 1]);
        }
        return neighbors;
    }
    
    getNeighbors2(x, y, cells) {
        let neighbors = [];
        if (checkBounds(x - 1, y, cells)) {
            neighbors.push(cells[x - 1][y]);
        }
        if (checkBounds(x + 1, y, cells)) {
            neighbors.push(cells[x + 1][y]);
        }
        if (checkBounds(x, y - 1, cells)) {
            neighbors.push(cells[x][y - 1]);
        }
        if (checkBounds(x, y + 1, cells)) {
            neighbors.push(cells[x][y + 1]);
        }
        return neighbors;
    }
}