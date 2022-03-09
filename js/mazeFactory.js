class MazeFactory {
    constructor(generator, width, height, cellSize) {
        switch (generator) {
            case "dfs": 
                return new Dfsmaze(width, height, cellSize);
            case "kruskal":
                return new Kruskalmaze(width, height, cellSize);
            case "prim":
                return new Primmaze(width, height, cellSize);
            case "division":
                return new Divisionmaze(width, height, cellSize);
            case "custom":
                return new Custommaze(width, height, cellSize);
            default:
                console.log("NO TYPE FOUND!");
        }
    }
}