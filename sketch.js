const width       = window.innerWidth;
const height      = window.innerHeight;
const bgColour    = 20;
let cellSize      = undefined;
let iterations    = undefined;
let frameTime     = undefined;
let maze          = undefined;
let pathfinder    = undefined;
let ini           = true;
let action        = undefined;
let blockClick    = false;

let first = false;

function setup() {
    createCanvas(width, height);
    background(bgColour);
    addControlsEventHandler();

    // step 1
    addGenerateEventHandler();
    addFramerateEventHandler();
    addIterationsEventHandler();

    // step 2
    addStartbtnEventHandler();
    addFinishBtnEventHandler();
    addPathfindEventHandler();
}

function addControlsEventHandler() {
    $(".controls").hover(() => {
        blockClick = true;
    });
}

function addGenerateEventHandler() {
    $("#generate").click(() => {
        clear();
        resizeCanvas(windowWidth, windowHeight);
        background(bgColour);

        if (pathfinder != undefined) {
            delete pathfinder;
            pathfinder = undefined;
            startPos = undefined;
            endPos = undefined;
            action = undefined;
        }

        frameTime = parseInt($("#frameRate").val());
        iterations = parseInt($("#iterations").val());
        cellSize = parseInt($("#cellSize").val());
        mazeType = $("#maze-selector").val();
        frameRate(frameTime);
        console.log(mazeType)
        maze = new MazeFactory(mazeType, width, height, cellSize);


    });
}

function addFramerateEventHandler() {
    $("#frameRate").keyup(() => {
        frameTime = parseInt($("#frameRate").val());
        frameRate(frameTime);
    })
}

function addIterationsEventHandler() {
    $("#iterations").keyup(() => {
        iterations = parseInt($("#iterations").val());
    })
}

function addStartbtnEventHandler() {
    $(".start-icon").click(() => {
        if (!isMazeFinished()) { return }

        if (action == "place-start") {
            action = undefined;
            $(".start-icon").removeClass("highlight-icon")
        }
        else
        {
            blockClick = true;
            action = "place-start";
            $(".start-icon").addClass("highlight-icon")
            $(".finish-icon").removeClass("highlight-icon")
        }  
    })
}

function addFinishBtnEventHandler() {
    $(".finish-icon").click(() => {
        if (!isMazeFinished()) { return }
        if (action == "place-end") {
            action = undefined;
            $(".finish-icon").removeClass("highlight-icon")
        }
        else
        {
            blockClick = true;
            action = "place-end";
            $(".finish-icon").addClass("highlight-icon")
            $(".start-icon").removeClass("highlight-icon")
        } 
    })
}

function addPathfindEventHandler() {
    $("#pathfind").click(() => {
        if (!isMazeFinished() || !pathfinder.runnable()) return 

        pathfinder.run();
        pathfinder.running = true;
    });
}

function keyPressed() {
    if (keyCode == 13) {
        ini = false;
    }
}

function isMazeFinished() {
    if (maze != undefined && maze.finished) {
        return true;
    }
        
    
    return false;
    //return maze != undefined && maze.finished
}

function draw() {
    if (mouseIsPressed) {
        mousePressedEvent();
    }

    if (maze != undefined) {
        //if (!ini) {
        for (let i=0; i<iterations; i++) {
            maze.increment();
        }
        //ini = true;
    //}

        maze.draw();
    }

    if (isMazeFinished()) {
        if (pathfinder == undefined) {
            $("#pathfinding").css('opacity', '1');
            pathfinder = new Dijkstra(maze.xCells, maze.yCells, maze.cells, maze.cellSize);
        }
        else
        {
            //if (!ini) {
                for (let i=0; i<iterations; i++) {
                    pathfinder.increment();
                }
                pathfinder.draw();

                //ini = true;
            //}
        }
    }
    else
    {
        $("#pathfinding").css('opacity', '0.2');
    }


}

function mousePressedEvent() {

    let hover = $('#controls').is(":hover");
    if (hover) {
        return;
    }
    if (blockClick) {
        blockClick = false;
        return;
    }
    if (action == undefined) return;

    const x = floor(mouseX/cellSize);
    const y = floor(mouseY/cellSize);

    if (x < 0 || x >= width) {
        return
    }
    if (y < 0 || y >= height) {
        return
    }

    if (!maze.cells[x][y].wall) {
        switch (action) {
            case 'place-start':
                if (pathfinder.startPos != undefined) {
                    maze.cells[pathfinder.startPos.x][pathfinder.startPos.y].draw();
                }

                pathfinder.startPosition = {x, y};
                break;
            case 'place-end':
                if (pathfinder.endPos != undefined) {
                    //maze.cells[pathfinder.endPos.x][pathfinder.endPos.y].draw();
                }
                pathfinder.endPos = {x, y};
                break;
        }
    }   
}