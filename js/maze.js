class Maze {
    constructor(width, height, cellSize, col) {
        this.width          = width;
        this.height         = height;
        this.xCells         = Math.ceil(width / cellSize);
        this.yCells         = Math.ceil(height / cellSize);
        this.cellSize       = cellSize;
        this.visitedCells   = [];
        this.cellCount      = this.xCells*this.yCells;
        this.fillNum        = 0;
        this.cells          = this.iniCells(this.xCells, this.yCells, this.cellSize, col);
        this.finished       = false;
    }

    iniCells(xCells, yCells, cellSize, col) {
        let cells = []
        for (let x = 0; x < xCells; x++) {
            let row = [];
            for (let y = 0; y < yCells; y++) {
                let cell = new Cell(x, y, cellSize);
                cell.cellSet = x*xCells+y;
                cell.colour2 = col;
                row.push(cell);
            }
            cells.push(row);
        }

        return cells
    }

    getWallBetween(cell1, cell2) {
        const x1 = cell1.x;
        const y1 = cell1.y;
        const x2 = cell2.x;
        const y2 = cell2.y;
        let x = 0;
        let y = 0;
        if (x1 == x2) {
            y = y2 - y1
            y += y > 0 ? -1 : 1;
        }

        if (y1 == y2) {
            x = x2 - x1
            x += x > 0 ? -1 : 1;
        }
        return this.cells[x1+x][y1+y];
    }

    visitCell(cell) {
        cell.visited    = true;
        cell.colour     = "hsl(" + round(this.fillNum/this.cellCount*360) + ", " + round(random(80, 90)) + "%, 50%)";
        this.fillNum++;
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

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
    
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    randomInt(max) {
        return Math.floor(Math.random() * max);
    }

    randomIntRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    forEachCell(func) {
        this.cells.forEach((row, x) => {
            row.forEach((column, y) => {
                const cell = this.cells[x][y];
                func(cell)
            });
        });
    }
}