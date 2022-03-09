class Custommaze extends Maze {
    constructor(width, height, cellSize) {
        super(width, height, cellSize);
        this.forEachCell((cell) => {
            this.visitCell(cell);
        });

        this.placeType = undefined;
        this.mouse = new MouseController();
        this.finished = true;
    }

    increment() {
        const x = floor(mouseX/this.cellSize);
        const y = floor(mouseY/this.cellSize);
        let cell = this.cells[x][y];

        if (this.mouse.pressed()) {
            console.log('pressed')
            this.placeType = cell.wall ? 'empty' : 'wall'
        }
        
        if (mouseIsPressed && action == undefined) {
            //this.click
            
            //console.log({x, y})
            //this.cells[x][y].wall 
            if (this.placeType == 'wall') {
                if (!cell.wall) {
                    cell.wall = true;
                    cell.finished = false;
                    cell.scale =  0;
                }
            }
        }

        if (this.mouse.released()) {
            this.placeType = undefined
        }
    }

    mousePressed() {
        console.log("wall")
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