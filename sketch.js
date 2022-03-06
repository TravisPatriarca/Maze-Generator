const width       = window.innerWidth;
const height      = window.innerHeight;
let cellSize      = 100;
let iterations    = 1;
const bgColour    = 30;
let frameTime     = 200;
let maze;

function setup() {
    let canvas = createCanvas(width, height);
    canvas.parent('container')
    background(bgColour);
    frameRate(frameTime);

    maze = new Maze(width, height, cellSize);
    //maze.visitCell(maze.currentCell, maze.visitedCells)

    $("#generate").click(() => {
        clear();
        resizeCanvas(windowWidth, windowHeight);
        background(bgColour);
        frameTime = parseInt($("#frameRate").val());
        iterations = parseInt($("#iterations").val());
        cellSize = parseInt($("#cellSize").val());
        frameRate(frameTime);
        maze = new Maze(width, height, cellSize);
        maze.visitCell(maze.currentCell, maze.visitedCells) 
    });

}

function draw() {
    for (let i=0; i<iterations; i++) {
        maze.incrementKruskal();
    }
}