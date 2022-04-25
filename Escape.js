let playerPosX = 20;
let playerPosY = 20;
const playerWidth = 50;
const playerHeight = 50;
const tileWidth = 40;
const tileHeight = 40;
const arcRadius = 20;
const tileRow = 10;
const tileCol = 10;
const MaxCan = 470;
let tiles = [];
let HP = 5;
let Gold = 0;
let colors = ["blue", "brown", "lightgreen", "green"];

let buyportion;


let EscapePosX = 50 * Math.floor(Math.random() * 9)
let EscapePosY = 50 * Math.floor(Math.random() * 9)
let ShopPosX = 50 * Math.floor(Math.random() * 9)
let ShopPosY = 50 * Math.floor(Math.random() * 9)

let visibility1 = document.getElementById("Button1");
let visibility2 = document.getElementById("Button2");
let visibility3 = document.getElementById("Button3");
let RCPAnswer = Math.floor(Math.random() * 3);

let CurHP = document.getElementById("CurrnetHP")
let CurGold = document.getElementById("CurrnetGold")

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext("2d");

let player = {
    left: 0, right: 0, top: 0, bottom: 0
}

let escapeRoom = {
    left: EscapePosX + arcRadius, right: EscapePosX + 2 * arcRadius, top: EscapePosY + arcRadius, bottom: EscapePosY + arcRadius * 2
}

let Shop = {
    left: ShopPosX + arcRadius, right: ShopPosX + 2 * arcRadius, top: EscapePosY + arcRadius, bottom: EscapePosY + arcRadius * 2
}


    

class tile {
    constructor(left, top, right, bottom, color) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.color = color;
    }

    draw() {
        context.rect(this.left, this.top, tileWidth, tileHeight);
        context.fillStyle = this.color;
        context.fill();
    }
}

function drawTiles() {
    context.beginPath();
    for(let i = 0; i < tileRow; i++) { 
        for(let j = 0; j < tileCol; j++) {
            tiles[i][j].draw();
        }
    }
    context.closePath();
}

function setTiles() {
    for(let i = 0; i < tileRow; i++) {
        tiles[i] = [];
        for(let j = 0; j < tileCol; j++) {
            tiles[i][j] = new tile(j * (tileWidth + 10), 
            i * (tileHeight + 10), j * (tileWidth + 10) + 40, i * (tileHeight + 10) + 40, "blue");
        }
    }
}

document.addEventListener('keydown', keyDownEventHandler);

function keyDownEventHandler(e) {
    if(e.key == 'ArrowRight') {
     if(playerPosX < MaxCan) {
        playerPosX += 50;
    }
    } else if(e.key == "ArrowLeft") {
        if(playerPosX > arcRadius) {
        playerPosX -= 50;
    }
    } else if(e.key == "ArrowDown") {
        if(playerPosY < MaxCan) {
        playerPosY += 50;
    }
    } else if(e.key == "ArrowUp") {
        if(playerPosY > arcRadius) {
        playerPosY -= 50;
    }   
    }

    if(e.key == "ArrowRight" ||
       e.key == "ArrowLeft" ||
       e.key == "ArrowDown" ||
       e.key == "ArrowUp") {
        MeetMonsterPer()
       }
}

function scissors() {
    let result = "";
    if(RCPAnswer == 0) {
        result = "Draw"
        alert("Draw")
    } else if (RCPAnswer == 1) {
        result = "Lose"
        alert('You Lose')
    } else if (RCPAnswer == 2) {
        result = "Win"
        alert("You Win")
    } 

    if(result == "Win") {
        Gold += Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 1;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    visibility1.style.visibility = "hidden";
    visibility2.style.visibility = "hidden";
    visibility3.style.visibility = "hidden";
}


function Rock() {
    let result = "";
    if(RCPAnswer == 0) {
        result = "Win"
        alert("You Win")
    } else if (RCPAnswer == 1) {
        result = "Draw"
        alert('Draw')
    } else if (RCPAnswer == 2) {
        result = "Lose"
        alert("You Lose")
    }

    if(result == "Win") {
        Gold += Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 1;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    visibility1.style.visibility = "hidden";
    visibility2.style.visibility = "hidden";
    visibility3.style.visibility = "hidden";
}

function Paper() {
    let result = "";
    if(RCPAnswer == 0) {
        result = "Lose"
        alert("You Lose")
    } else if (RCPAnswer == 1) {
        result = "Win"
        alert('You Win')
    } else if (RCPAnswer == 2) {
        result = "Draw"
        alert("Draw")
    }

    if(result == "Win") {
        Gold += Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 1;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    visibility1.style.visibility = "hidden";
    visibility2.style.visibility = "hidden";
    visibility3.style.visibility = "hidden";
}

function PlayerHP() {
    return HP
}

function PlayerGold() {
    return Gold;
}

function UpdateHPGold() {
    if(HP == 0) {
        window.location.reload(true);
        alert("Game Over")
    }
    document.getElementById('CurrentHP').innerHTML = `HP : ${HP}`
    document.getElementById('CurrentGold').innerHTML = `Gold : ${Gold}`
}

function MeetMonsterPer() {
    let MeetPer = Math.floor(Math.random() * 8);
    if(MeetPer < 1){
    visibility1.style.visibility = "visible";
    visibility2.style.visibility = "visible";
    visibility3.style.visibility = "visible";
    alert("MetMonster");
    MeetPer = Math.floor(Math.random() * 8);
    } else {
        visibility1.style.visibility = "hidden";
        visibility2.style.visibility = "hidden";
        visibility3.style.visibility = "hidden";
    }
}

function update() {
    Escape();   
    UpdateHPGold();
}


function Escape() {
    if(playerPosX == escapeRoom.left &&
        playerPosY == escapeRoom.top) {
        window.location.reload(true);
        alert("Game Clear")
    }
}

function MetShop() {
        prompt("몇개의 포션을 구매 하시겠습니까? ( HP 1 회복, Gold : 50 소모 )", buyportion)
        console.log(buyportion); 
}



function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    setTiles();
    drawTiles()
    drawEscape()
    drawShop()
    drawPlayer()
    update()
    
}



function drawPlayer() {
    context.beginPath();
    context.arc(playerPosX, playerPosY, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

function drawEscape() {
    context.beginPath();
    context.arc(escapeRoom.left, escapeRoom.top, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'pink';
    context.fill();
    context.closePath();
}

function drawShop() {
    context.beginPath();
    context.arc(Shop.left, Shop.top, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
}

setInterval(draw, 10) 
