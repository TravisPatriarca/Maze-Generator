const width         = window.innerWidth;
const height        = window.innerHeight;
let cellSize      = 50;
const xCells        = Math.ceil(width / cellSize);
const yCells        = Math.ceil(height / cellSize);
const cellCount     = xCells*yCells;
let cells           = [];
let visitedCells    = [];
let currentCell     = undefined;
let fillNum         = 0;
let cx = 0, cy = 0;
const iterations = 1;

function setup() {
    createCanvas(width, height);

    cells = iniCells(xCells, yCells, cellSize);
    currentCell = cells[0][0];
    background(30);
    frameRate(500);
    visitCell(currentCell, visitedCells)
}

function draw() {
    for (let i=0; i<iterations; i++) {
        if (visitedCells.length > 0) {
            let neighbours = getNeighbors(currentCell.x, currentCell.y, cells);
            if (neighbours.length > 0) {
                const randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
                currentCell.walls[currentCell.getWallMeeting(randomNeighbour)] = false;
                randomNeighbour.walls[randomNeighbour.getWallMeeting(currentCell)] = false;
                currentCell = randomNeighbour;
                visitCell(currentCell, visitedCells);
            }
            else
            {
                currentCell = visitedCells.pop();
            }
        }
    }
}

function visitCell(cell, visitedCells) {
    cell.visited = true;
    cell.filled = true;
    cell.colour = "hsl(" + round(fillNum/cellCount*360) + ", " + round(random(80, 90)) + "%, 50%)";
    cell.draw(true);

    
    fillNum++;
    visitedCells.push(cell); 

    let neighbours = getNeighbors2(cell.x, cell.y, cells);
    neighbours.forEach((neighbour) => {
        neighbour.draw(true);
    }) 
}

function checkBounds(x, y, cells) {
    if (x < 0 || x >= cells.length || y < 0 || y >= cells[0].length) {
        return false;
    }
    return true;
}

function getNeighbors(x, y, cells) {
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

function getNeighbors2(x, y, cells) {
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

function iniCells(xCells, yCells, cellSize) {
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

/*function drawCells(xCells, yCells, outline=false) {
    for (let x = 0; x < xCells; x++) {
        for (let y = 0; y < yCells; y++) {
            cells[x][y].draw(outline);
        }
    }
}*/