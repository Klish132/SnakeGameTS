let level1: string = `eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeseeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

let level2: string = `wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeseeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`

let level3: string = `eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
ewwwwwwwwwwwwwwwwweeeewwwwwwwwwwwwwwwwwe
eweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
eweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
eweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
eweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
eweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
eweeeeeeeeeeeewwwwwwwwwwwweeeeeeeeeeeewe
eeeeeeeeeeeeeeweeeeeeeeeeweeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
eeeeeeeeeeeeeeweeeeeeeeeeweeeeeeeeeeeeee
eweeeeeeeeeeeewwwwwwwwwwwweeeeeeeeeeeewe
eweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
eweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
eweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
eweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
eweeeeseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe
ewwwwwwwwwwwwwwwwweeeewwwwwwwwwwwwwwwwwe
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

let levels: string[] = [level1, level2, level3];

enum CELLTYPE {
    Empty,
    SnakeBody,
    Food,
    Wall
}

enum BODYSUBTYPE {
    Normal,
    Head,
    Tail,
    WithFood,
    WithMushroom
}

enum FOODSUBTYPE {
    Normal,
    Mushroom
}

enum DIR {
    Up,
    Down,
    Left,
    Right
}

class Cell {
    public posX: number;
    public posY: number;
    public direction: DIR;
    protected rotation: number;

    protected type: CELLTYPE;
    protected subtype: number;

    protected game: Game;

    protected context: CanvasRenderingContext2D;

    constructor(cellType: CELLTYPE, x: number, y: number, ctx: CanvasRenderingContext2D, currentGame: Game, dir: DIR = DIR.Up, cellSubtype: number = 1) {
        this.game = currentGame;
        this.posX = x;
        this.posY = y;
        this.context = ctx;
        this.setDirection(dir);
        this.setType(cellType, cellSubtype);
    }

    public setType(newType: CELLTYPE, newSubtype: number = 1) {
        if (newType == CELLTYPE.Empty) {
            if (this.type != CELLTYPE.Empty)
                this.game.addCellToArray(this, this.game.emptyCellArray);
            this.setDirection(DIR.Up);
        } else {
            if (this.type == CELLTYPE.Empty)
                this.game.removeCellFromArray(this, this.game.emptyCellArray);
        }
        this.type = newType;
        this.setSubtype(newSubtype);
    }

    public getType(): number {
        return this.type;
    }

    public setSubtype(subtype: number) {
        this.subtype = subtype;
    }

    public getSubtype(): number {
        return this.subtype;
    }

    public setDirection(newDir: DIR): void {
        this.direction = newDir;
        this.rotateCell();
    }

    protected rotateCell() {
        switch(this.direction) {
            case DIR.Up:
                this.rotation = 0;
                break;
            case DIR.Right:
                this.rotation = 90;
                break;
            case DIR.Down:
                this.rotation = 180;
                break;
            case DIR.Left:
                this.rotation = 270;
                break;
            default:
                throw "Invalid direction!";
        }
    }

    public drawCell(): void {
        let centerX = this.posX * 10 + 5; let centerY = this.posY * 10 + 5;
        let radRotation = this.rotation * Math.PI/180
        this.context.translate(centerX, centerY);
        this.context.rotate(radRotation);
        switch(this.type) {
            case CELLTYPE.Empty:
                break;
            case CELLTYPE.Food:
                switch(this.subtype) {
                    case FOODSUBTYPE.Normal:
                        this.context.fillStyle = "#26eb2c";
                        this.context.fillRect(-4, -3, 8, 8);
                        this.context.fillStyle = "black";
                        this.context.fillRect(-1, -5, 2, 2);
                        break;
                    case FOODSUBTYPE.Mushroom:
                        this.context.fillStyle = "#ff1a1a";
                        this.context.fillRect(-5, -5, 10, 4);
                        this.context.fillStyle = "black";
                        this.context.fillRect(-1, -1, 2, 6);
                        break;
                    default:
                        throw "Invalid food subtype!";
                }
                break;
            case CELLTYPE.SnakeBody:
                switch(this.subtype) {
                    case BODYSUBTYPE.Head:
                        this.context.fillStyle = "#bf8b22";
                        this.context.fillRect(-6, -6, 12, 12);
                        this.context.fillStyle = "white";
                        this.context.fillRect(-5 + 1, -5 + 2, 2, 2);
                        this.context.fillRect(-5 + 7, -5 + 2, 2, 2);
                        break;
                    case BODYSUBTYPE.WithFood:
                        this.context.fillStyle = "#1cb021";
                        this.context.fillRect(-6, -6, 12, 12);
                        break;
                    case BODYSUBTYPE.WithMushroom:
                        this.context.fillStyle = "#a61212";
                        this.context.fillRect(-6, -6, 12, 12);
                        break;
                    case BODYSUBTYPE.Tail:
                        this.context.fillStyle = "#f2be55";
                        this.context.fillRect(-3, -5, 6, 10);
                        break;
                    case BODYSUBTYPE.Normal:
                        this.context.fillStyle = "#dea533";
                        this.context.fillRect(-5, -5, 10, 10);
                        break;
                    default:
                        throw "Invalid body subtype!";
                }
                break;
            case CELLTYPE.Wall:
                this.context.fillStyle = "black";
                this.context.fillRect(-5, -5, 10, 10);
                break;
            default:
                this.context.fillStyle = "purple";
                this.context.fillRect(-5, -5, 10, 10);
                break;
        }
        this.context.rotate(-radRotation);
        this.context.translate(-centerX, -centerY);
    }
}

class Snake {

    private game: Game;

    private nextDirection: DIR = DIR.Up;
    private bodyArray: Cell[] = [];

    constructor(game: Game, head: Cell) {
        this.game = game;
        this.bodyArray.unshift(head);
    }

    public getHead(): Cell {
        return this.bodyArray[0];
    }

    public shiftHead(newHead: Cell, newPrevHeadType: BODYSUBTYPE = BODYSUBTYPE.Normal): void {
        let newDir: number = newHead.direction;
        if (this.bodyArray.length != 0) {
            let prevHead = this.bodyArray[0];
            newDir = prevHead.direction;
            prevHead.setSubtype(newPrevHeadType);
        }
        if (newHead)
        newHead.setType(CELLTYPE.SnakeBody, BODYSUBTYPE.Head);
        newHead.setDirection(newDir);
        this.bodyArray.unshift(newHead);
    }

    public shiftTail(): void {
        let prevTail = this.bodyArray.pop();
        prevTail.setType(CELLTYPE.Empty);
        if (this.bodyArray.length != 1) {
            let newTail = this.bodyArray[this.bodyArray.length - 1];
            newTail.setSubtype(BODYSUBTYPE.Tail);
        }
    }

    public changeDirection(newDir: DIR): void {
        let headDir = this.getHead().direction;
        if (newDir != headDir) {
            switch(newDir) {
                case DIR.Up:
                    if (headDir != DIR.Down)
                        this.nextDirection = newDir;
                    break;
                case DIR.Down:
                    if (headDir != DIR.Up)
                        this.nextDirection = newDir;
                    break;
                case DIR.Left:
                    if (headDir != DIR.Right)
                        this.nextDirection = newDir;
                    break;
                case DIR.Right:
                    if (headDir != DIR.Left)
                        this.nextDirection = newDir;
                    break;
                default:
                    throw "Invalid direction!";
            }
        }
    }

    public getDestinationCell(): Cell {
        let currHead = this.getHead();
        let newX = currHead.posX; let newY = currHead.posY;
        switch(this.getHead().direction) {
            case DIR.Up:
                newY = newY == 0 ? this.game.fieldHeight - 1 : newY - 1;
                break;
            case DIR.Down:
                newY = newY == this.game.fieldHeight - 1 ? 0 : newY + 1;
                break;
            case DIR.Left:
                newX = newX == 0 ? this.game.fieldWidth - 1 : newX - 1;
                break;
            case DIR.Right:
                newX = newX == this.game.fieldWidth - 1 ? 0 : newX + 1;
                break;
            default:
                throw "Invalid direction!";
        }
        return this.game.cellArray[newX][newY];
    }

    public move(): GAMESTATUS {
        this.getHead().setDirection(this.nextDirection);
        let destinationCell = this.getDestinationCell();

        switch(destinationCell.getType()) {
            case CELLTYPE.Food:
                switch(destinationCell.getSubtype()) {
                    case FOODSUBTYPE.Normal:
                        this.game.updateScore(10);
                        this.game.removeCellFromArray(destinationCell, this.game.foodArray);
                        this.shiftHead(destinationCell, BODYSUBTYPE.WithFood);
                        break;
                    case FOODSUBTYPE.Mushroom:
                        if (this.bodyArray.length == 1) {
                            return GAMESTATUS.GameOver;
                        }
                        this.game.updateScore(-10);
                        this.game.removeCellFromArray(destinationCell, this.game.mushroomArray);
                        this.shiftHead(destinationCell, BODYSUBTYPE.WithMushroom);
                        this.shiftTail();
                        this.shiftTail();
                        break;
                    default:
                        throw "Invalid food subtype!";
                }
                return GAMESTATUS.FoodEaten;
            case CELLTYPE.Empty:
                this.shiftHead(destinationCell);
                this.shiftTail();
                return GAMESTATUS.Normal;
            default:
                return GAMESTATUS.GameOver;
        }
    }

    public drawSnake(): void {
        for (let bodycell of this.bodyArray) {
            bodycell.drawCell();
        }
    }
}

enum GAMESTATUS {
    Normal,
    FoodEaten,
    GameOver
}

class Game {
    public fieldWidth: number;
    public fieldHeight: number;

    private score: number = 0;
    private baseSpeed: number = 200;
    private gameSpeed: number = this.baseSpeed;

    private isPaused: boolean = true;
    private currentLevel: number = 1;
    private levelIsFinished: boolean = false;

    private snake: Snake;
    public cellArray: Cell[][] = [];
    public foodArray: Cell[] = [];
    public mushroomArray: Cell[] = [];
    public wallArray: Cell[] = [];
    public emptyCellArray: Cell[] = [];

    private timerID: number;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private scoreSpan: HTMLElement;
    private levelSelect: HTMLSelectElement;

    constructor(fieldWidth: number, fieldHeight: number) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;

        this.canvas = document.getElementById("field") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");

        document.addEventListener("keydown", this.onKeydown.bind(this));

        this.scoreSpan = document.getElementById("score-span");
        this.levelSelect = document.getElementById("level-select") as HTMLSelectElement;
        this.levelSelect.addEventListener("change", this.changeLevel.bind(this));

        this.restartGame();
    }

    private restartGame(): void {
        this.pauseGame();
        this.score = 0;
        this.scoreSpan.innerHTML = this.score.toString();
        this.gameSpeed = this.baseSpeed;
        this.levelIsFinished = false;
        this.loadLevel(this.currentLevel);
        this.createNewFood(2);
        this.redrawField();
    }

    private pauseGame(): void {
        if (!this.isPaused) {
            this.isPaused = true;
            clearTimeout(this.timerID);
        }
    }

    private unpauseGame(): void {
        if (this.isPaused && !this.levelIsFinished) {
            this.isPaused = false;
            this.update();
            this.timerID = setTimeout(() => this.updateTimer(), this.gameSpeed);
        }
    }

    private updateTimer(): void { 
        if (!this.isPaused) {
            this.update();
            this.timerID = setTimeout(() => this.updateTimer(), this.gameSpeed);
        }
    }

    public updateScore(scoreIncr: number): void {
        this.score += scoreIncr;
        if (this.score < 0)
            this.score = 0;
        this.updateSpeed();
        this.scoreSpan.innerHTML = this.score.toString();
    }

    private updateSpeed(): void {
        let scoreToSpeed = Math.floor(this.score / 5);
        this.gameSpeed = this.baseSpeed - scoreToSpeed;
    }

    private onKeydown(event: KeyboardEvent) {
        switch(event.key) {
            case "ArrowUp":
                this.snake.changeDirection(DIR.Up);
                break;
            case "ArrowDown":
                this.snake.changeDirection(DIR.Down);
                break;
            case "ArrowLeft":
                this.snake.changeDirection(DIR.Left);
                break;
            case "ArrowRight":
                this.snake.changeDirection(DIR.Right);
                break;
            case " " || "Spacebar":
                this.unpauseGame();
                break;
            default:
                break;
        }
    }

    private changeLevel(): void {
        switch(this.levelSelect.value) {
            case "level1":
                this.currentLevel = 1;
                break;
            case "level2":
                this.currentLevel = 2;
                break;
            case "level3":
                this.currentLevel = 3;
                break;
            default:
                throw "Invalid level";
        }
        this.restartGame();
    }

    private clearArrays(): void {
        this.cellArray = [];
        this.emptyCellArray = [];
        this.foodArray = [];
        this.mushroomArray = [];
        this.wallArray = [];
    }

    private loadLevel(lvlNumber: number): void {
        let level = levels[lvlNumber - 1];
        let row = 0;
        let symbolCounter = 0
        this.clearArrays();
        for (let i = 0; i < this.fieldWidth; i++) {
            this.cellArray[i] = [];
        }
        for (let i = 0; i < level.length; i++) {
            switch(level.charAt(i)) {
                case "\n":
                    row++;
                    break;
                case "e":
                    let emptyCell = new Cell(CELLTYPE.Empty, symbolCounter % this.fieldWidth, row, this.context, this);
                    this.cellArray[symbolCounter % this.fieldWidth][row] = emptyCell;
                    symbolCounter++;
                    break;
                case "w":
                    let wallCell = new Cell(CELLTYPE.Wall, symbolCounter % this.fieldWidth, row, this.context, this);
                    this.cellArray[symbolCounter % this.fieldWidth][row] = wallCell;
                    this.addCellToArray(wallCell, this.wallArray);
                    symbolCounter++;
                    break;
                case "s":
                    let snakeHead = new Cell(CELLTYPE.SnakeBody, symbolCounter % this.fieldWidth, row, this.context, this, DIR.Up, BODYSUBTYPE.Head);
                    this.snake = new Snake(this, snakeHead);
                    this.cellArray[symbolCounter % this.fieldWidth][row] = snakeHead;
                    symbolCounter++;
                    break;
            }
        }
    }

    public removeCellFromArray(cell: Cell, array: Cell[]): void {
        let idx = array.indexOf(cell);
        if (idx != -1) {
            array.splice(idx, 1);
        }
    }

    public addCellToArray(cell: Cell, array: Cell[]): void {
        if (!array.includes(cell)) {
            array.push(cell);
        }
    }

    private createNewFood(foodCount: number): void {
        let createMushroom = this.getRandomNumber(0, 2);
        if (this.emptyCellArray.length > 1 && createMushroom == 0) {
            let randomEmpty = this.getRandomNumber(0, this.emptyCellArray.length - 1);
            let newMushroom = this.emptyCellArray[randomEmpty];
            newMushroom.setType(CELLTYPE.Food, FOODSUBTYPE.Mushroom);
            this.mushroomArray.push(newMushroom);
        }
        for (let i = 0; i < foodCount; i++) {
            if (this.emptyCellArray.length == 0) {
                break;
            }
            let randomEmpty = this.getRandomNumber(0, this.emptyCellArray.length - 1);
            let newFood = this.emptyCellArray[randomEmpty];
            newFood.setType(CELLTYPE.Food, FOODSUBTYPE.Normal);
            this.foodArray.push(newFood);
        }
    }

    private drawCellsOfArray(array: Cell[]): void {
        for (let cell of array) {
            cell.drawCell();
        }
    }

    private redrawField(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.drawSnake();
        this.drawCellsOfArray(this.foodArray);
        this.drawCellsOfArray(this.mushroomArray);
        this.drawCellsOfArray(this.wallArray);
    }

    private update(): void {
        let status = this.snake.move();
        if (this.score > 500) {
            alert("Level finished!");
            this.levelIsFinished = true;
            this.pauseGame();
        }

        switch (status) {
            case GAMESTATUS.GameOver:
                alert("Game over!");
                this.pauseGame();
                break;
            case GAMESTATUS.Normal:
                break;
            case GAMESTATUS.FoodEaten:
                if (this.foodArray.length == 0) {
                    if (this.mushroomArray.length != 0) {
                        for (let mushroom of this.mushroomArray) {
                            mushroom.setType(CELLTYPE.Empty);
                        }
                        this.mushroomArray = [];
                    }
                    this.createNewFood(2);
                }
                break;
            default:
                throw "Invalid game status!";
        }
        this.redrawField();
    }

    private getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

const game = new Game(40, 20);