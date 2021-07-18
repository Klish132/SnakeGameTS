var level1 = "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeseeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
var level2 = "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeseeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew\nwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww";
var level3 = "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\newwwwwwwwwwwwwwwwweeeewwwwwwwwwwwwwwwwwe\neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\neweeeeeeeeeeeewwwwwwwwwwwweeeeeeeeeeeewe\neeeeeeeeeeeeeeweeeeeeeeeeweeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\neeeeeeeeeeeeeeweeeeeeeeeeweeeeeeeeeeeeee\neweeeeeeeeeeeewwwwwwwwwwwweeeeeeeeeeeewe\neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\neweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\neweeeeseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewe\newwwwwwwwwwwwwwwwweeeewwwwwwwwwwwwwwwwwe\neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
var levels = [level1, level2, level3];
var CELLTYPE;
(function (CELLTYPE) {
    CELLTYPE[CELLTYPE["Empty"] = 0] = "Empty";
    CELLTYPE[CELLTYPE["SnakeBody"] = 1] = "SnakeBody";
    CELLTYPE[CELLTYPE["Food"] = 2] = "Food";
    CELLTYPE[CELLTYPE["Wall"] = 3] = "Wall";
})(CELLTYPE || (CELLTYPE = {}));
var BODYSUBTYPE;
(function (BODYSUBTYPE) {
    BODYSUBTYPE[BODYSUBTYPE["Normal"] = 0] = "Normal";
    BODYSUBTYPE[BODYSUBTYPE["Head"] = 1] = "Head";
    BODYSUBTYPE[BODYSUBTYPE["Tail"] = 2] = "Tail";
    BODYSUBTYPE[BODYSUBTYPE["WithFood"] = 3] = "WithFood";
    BODYSUBTYPE[BODYSUBTYPE["WithMushroom"] = 4] = "WithMushroom";
})(BODYSUBTYPE || (BODYSUBTYPE = {}));
var FOODSUBTYPE;
(function (FOODSUBTYPE) {
    FOODSUBTYPE[FOODSUBTYPE["Normal"] = 0] = "Normal";
    FOODSUBTYPE[FOODSUBTYPE["Mushroom"] = 1] = "Mushroom";
})(FOODSUBTYPE || (FOODSUBTYPE = {}));
var DIR;
(function (DIR) {
    DIR[DIR["Up"] = 0] = "Up";
    DIR[DIR["Down"] = 1] = "Down";
    DIR[DIR["Left"] = 2] = "Left";
    DIR[DIR["Right"] = 3] = "Right";
})(DIR || (DIR = {}));
var Cell = /** @class */ (function () {
    function Cell(cellType, x, y, ctx, currentGame, dir, cellSubtype) {
        if (dir === void 0) { dir = DIR.Up; }
        if (cellSubtype === void 0) { cellSubtype = 1; }
        this.game = currentGame;
        this.posX = x;
        this.posY = y;
        this.context = ctx;
        this.setDirection(dir);
        this.setType(cellType, cellSubtype);
    }
    Cell.prototype.setType = function (newType, newSubtype) {
        if (newSubtype === void 0) { newSubtype = 1; }
        if (newType == CELLTYPE.Empty) {
            if (this.type != CELLTYPE.Empty)
                this.game.addCellToArray(this, this.game.emptyCellArray);
            this.setDirection(DIR.Up);
        }
        else {
            if (this.type == CELLTYPE.Empty)
                this.game.removeCellFromArray(this, this.game.emptyCellArray);
        }
        this.type = newType;
        this.setSubtype(newSubtype);
    };
    Cell.prototype.getType = function () {
        return this.type;
    };
    Cell.prototype.setSubtype = function (subtype) {
        this.subtype = subtype;
    };
    Cell.prototype.getSubtype = function () {
        return this.subtype;
    };
    Cell.prototype.setDirection = function (newDir) {
        this.direction = newDir;
        this.rotateCell();
    };
    Cell.prototype.rotateCell = function () {
        switch (this.direction) {
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
    };
    Cell.prototype.drawCell = function () {
        var centerX = this.posX * 10 + 5;
        var centerY = this.posY * 10 + 5;
        var radRotation = this.rotation * Math.PI / 180;
        this.context.translate(centerX, centerY);
        this.context.rotate(radRotation);
        switch (this.type) {
            case CELLTYPE.Empty:
                break;
            case CELLTYPE.Food:
                switch (this.subtype) {
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
                switch (this.subtype) {
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
    };
    return Cell;
}());
var Snake = /** @class */ (function () {
    function Snake(game, head) {
        this.nextDirection = DIR.Up;
        this.bodyArray = [];
        this.game = game;
        this.bodyArray.unshift(head);
    }
    Snake.prototype.getHead = function () {
        return this.bodyArray[0];
    };
    Snake.prototype.shiftHead = function (newHead, newPrevHeadType) {
        if (newPrevHeadType === void 0) { newPrevHeadType = BODYSUBTYPE.Normal; }
        var newDir = newHead.direction;
        if (this.bodyArray.length != 0) {
            var prevHead = this.bodyArray[0];
            newDir = prevHead.direction;
            prevHead.setSubtype(newPrevHeadType);
        }
        if (newHead)
            newHead.setType(CELLTYPE.SnakeBody, BODYSUBTYPE.Head);
        newHead.setDirection(newDir);
        this.bodyArray.unshift(newHead);
    };
    Snake.prototype.shiftTail = function () {
        var prevTail = this.bodyArray.pop();
        prevTail.setType(CELLTYPE.Empty);
        if (this.bodyArray.length != 1) {
            var newTail = this.bodyArray[this.bodyArray.length - 1];
            newTail.setSubtype(BODYSUBTYPE.Tail);
        }
    };
    Snake.prototype.changeDirection = function (newDir) {
        var headDir = this.getHead().direction;
        if (newDir != headDir) {
            switch (newDir) {
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
    };
    Snake.prototype.getDestinationCell = function () {
        var currHead = this.getHead();
        var newX = currHead.posX;
        var newY = currHead.posY;
        switch (this.getHead().direction) {
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
    };
    Snake.prototype.move = function () {
        this.getHead().setDirection(this.nextDirection);
        var destinationCell = this.getDestinationCell();
        switch (destinationCell.getType()) {
            case CELLTYPE.Food:
                switch (destinationCell.getSubtype()) {
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
    };
    Snake.prototype.drawSnake = function () {
        for (var _i = 0, _a = this.bodyArray; _i < _a.length; _i++) {
            var bodycell = _a[_i];
            bodycell.drawCell();
        }
    };
    return Snake;
}());
var GAMESTATUS;
(function (GAMESTATUS) {
    GAMESTATUS[GAMESTATUS["Normal"] = 0] = "Normal";
    GAMESTATUS[GAMESTATUS["FoodEaten"] = 1] = "FoodEaten";
    GAMESTATUS[GAMESTATUS["GameOver"] = 2] = "GameOver";
})(GAMESTATUS || (GAMESTATUS = {}));
var Game = /** @class */ (function () {
    function Game(fieldWidth, fieldHeight) {
        this.score = 0;
        this.baseSpeed = 200;
        this.gameSpeed = this.baseSpeed;
        this.isPaused = true;
        this.currentLevel = 1;
        this.levelIsFinished = false;
        this.cellArray = [];
        this.foodArray = [];
        this.mushroomArray = [];
        this.wallArray = [];
        this.emptyCellArray = [];
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.canvas = document.getElementById("field");
        this.context = this.canvas.getContext("2d");
        document.addEventListener("keydown", this.onKeydown.bind(this));
        this.scoreSpan = document.getElementById("score-span");
        this.levelSelect = document.getElementById("level-select");
        this.levelSelect.addEventListener("change", this.changeLevel.bind(this));
        this.restartGame();
    }
    Game.prototype.restartGame = function () {
        this.pauseGame();
        this.score = 0;
        this.scoreSpan.innerHTML = this.score.toString();
        this.gameSpeed = this.baseSpeed;
        this.levelIsFinished = false;
        this.loadLevel(this.currentLevel);
        this.createNewFood(2);
        this.redrawField();
    };
    Game.prototype.pauseGame = function () {
        if (!this.isPaused) {
            this.isPaused = true;
            clearTimeout(this.timerID);
        }
    };
    Game.prototype.unpauseGame = function () {
        var _this = this;
        if (this.isPaused && !this.levelIsFinished) {
            this.isPaused = false;
            this.update();
            this.timerID = setTimeout(function () { return _this.updateTimer(); }, this.gameSpeed);
        }
    };
    Game.prototype.updateTimer = function () {
        var _this = this;
        if (!this.isPaused) {
            this.update();
            this.timerID = setTimeout(function () { return _this.updateTimer(); }, this.gameSpeed);
        }
    };
    Game.prototype.updateScore = function (scoreIncr) {
        this.score += scoreIncr;
        if (this.score < 0)
            this.score = 0;
        this.updateSpeed();
        this.scoreSpan.innerHTML = this.score.toString();
    };
    Game.prototype.updateSpeed = function () {
        var scoreToSpeed = Math.floor(this.score / 5);
        this.gameSpeed = this.baseSpeed - scoreToSpeed;
    };
    Game.prototype.onKeydown = function (event) {
        switch (event.key) {
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
    };
    Game.prototype.changeLevel = function () {
        switch (this.levelSelect.value) {
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
    };
    Game.prototype.clearArrays = function () {
        this.cellArray = [];
        this.emptyCellArray = [];
        this.foodArray = [];
        this.mushroomArray = [];
        this.wallArray = [];
    };
    Game.prototype.loadLevel = function (lvlNumber) {
        var level = levels[lvlNumber - 1];
        var row = 0;
        var symbolCounter = 0;
        this.clearArrays();
        for (var i = 0; i < this.fieldWidth; i++) {
            this.cellArray[i] = [];
        }
        for (var i = 0; i < level.length; i++) {
            switch (level.charAt(i)) {
                case "\n":
                    row++;
                    break;
                case "e":
                    var emptyCell = new Cell(CELLTYPE.Empty, symbolCounter % this.fieldWidth, row, this.context, this);
                    this.cellArray[symbolCounter % this.fieldWidth][row] = emptyCell;
                    symbolCounter++;
                    break;
                case "w":
                    var wallCell = new Cell(CELLTYPE.Wall, symbolCounter % this.fieldWidth, row, this.context, this);
                    this.cellArray[symbolCounter % this.fieldWidth][row] = wallCell;
                    this.addCellToArray(wallCell, this.wallArray);
                    symbolCounter++;
                    break;
                case "s":
                    var snakeHead = new Cell(CELLTYPE.SnakeBody, symbolCounter % this.fieldWidth, row, this.context, this, DIR.Up, BODYSUBTYPE.Head);
                    this.snake = new Snake(this, snakeHead);
                    this.cellArray[symbolCounter % this.fieldWidth][row] = snakeHead;
                    symbolCounter++;
                    break;
            }
        }
    };
    Game.prototype.removeCellFromArray = function (cell, array) {
        var idx = array.indexOf(cell);
        if (idx != -1) {
            array.splice(idx, 1);
        }
    };
    Game.prototype.addCellToArray = function (cell, array) {
        if (!array.includes(cell)) {
            array.push(cell);
        }
    };
    Game.prototype.createNewFood = function (foodCount) {
        var createMushroom = this.getRandomNumber(0, 2);
        if (this.emptyCellArray.length > 1 && createMushroom == 0) {
            var randomEmpty = this.getRandomNumber(0, this.emptyCellArray.length - 1);
            var newMushroom = this.emptyCellArray[randomEmpty];
            newMushroom.setType(CELLTYPE.Food, FOODSUBTYPE.Mushroom);
            this.mushroomArray.push(newMushroom);
        }
        for (var i = 0; i < foodCount; i++) {
            if (this.emptyCellArray.length == 0) {
                break;
            }
            var randomEmpty = this.getRandomNumber(0, this.emptyCellArray.length - 1);
            var newFood = this.emptyCellArray[randomEmpty];
            newFood.setType(CELLTYPE.Food, FOODSUBTYPE.Normal);
            this.foodArray.push(newFood);
        }
    };
    Game.prototype.drawCellsOfArray = function (array) {
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var cell = array_1[_i];
            cell.drawCell();
        }
    };
    Game.prototype.redrawField = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.drawSnake();
        this.drawCellsOfArray(this.foodArray);
        this.drawCellsOfArray(this.mushroomArray);
        this.drawCellsOfArray(this.wallArray);
    };
    Game.prototype.update = function () {
        var status = this.snake.move();
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
                        for (var _i = 0, _a = this.mushroomArray; _i < _a.length; _i++) {
                            var mushroom = _a[_i];
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
    };
    Game.prototype.getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Game;
}());
var game = new Game(40, 20);
