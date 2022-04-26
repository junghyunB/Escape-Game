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

let colors = {
    blue: "blue", green: "green", lightgreen: "lightgreen", brown: "brown"
}


    

class Tile {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.color = "black";
        this.sight = false; 
        this.visit = false;     
    }

    draw() {
        context.rect(this.left, this.top, tileWidth, tileHeight);
        context.fillStyle = this.color;
        context.fill();
    }
}




function drawTiles() {
    for(let i = 0; i < tileRow; i++) { 
        for(let j = 0; j < tileCol; j++) {
            context.beginPath();
            tiles[i][j].draw();
            context.closePath();
        }
    }
    
}

let randomTiles;

function setTiles() {

    for(let i = 0; i < tileRow; i++) {
        tiles[i] = [];
        for(let j = 0; j < tileCol; j++) {
            randomTiles = Math.floor(Math.random() * 4)
            tiles[i][j] = new Tile(j * (tileWidth + 10), 
            i * (tileHeight + 10), j * (tileWidth + 10) + 40, i * (tileHeight + 10) + 40);
      
        }     
    }

}

function SightFunc() {
    
    for(let i = 0; i < tileRow; i++) {
        for(let j = 0; j < tileCol; j++) {
            if(isCollisionRectToRect(player, tiles[i][j])) {
                tiles[i][j].sight = true;
                randomTiles = Math.floor(Math.random() * 4)
                if(randomTiles == 0 && tiles[i][j].sight == true) {        
                    tiles[i][j].color = "blue";
                } else if(randomTiles == 1 && tiles[i][j].sight == true) {         
                    tiles[i][j].color =  "green";
                } else if(randomTiles == 2 && tiles[i][j].sight == true) {
                    tiles[i][j].color = "lightgreen"
                } else if(randomTiles == 3 && tiles[i][j].sight == true) {
                    tiles[i][j].color = "brown"
                }
            }
        }
    }
}



document.addEventListener('keydown', keyDownEventHandler);

function isCollisionRectToRect(rectA, rectB) {
    if (rectA.left > rectB.right + 50 ||
        rectA.right + 50 < rectB.left ||
        rectA.top > rectB.bottom + 50||
        rectA.bottom + 50 < rectB.top) {
        return false;
    } //안겹친다

    return true; // 겹친다
}

function isCollisionRectToRect2(rectA, rectB) {
    if (rectA.left > rectB.right ||
        rectA.right < rectB.left ||
        rectA.top > rectB.bottom ||
        rectA.bottom < rectB.top) {
        return false;
    } //안겹친다

    return true; // 겹친다
}


function keyDownEventHandler(e) {


    if(e.key == 'ArrowRight') {
     if(playerPosX < MaxCan) {
        playerPosX += 50;
        MetShop()
        MeetMonsterPer()
        SightFunc()
    }
    } else if(e.key == "ArrowLeft") {
        if(playerPosX > arcRadius) {
        playerPosX -= 50;
        MetShop()
        MeetMonsterPer()
        SightFunc()
    }
    } else if(e.key == "ArrowDown") {
        if(playerPosY < MaxCan) {
        playerPosY += 50;
        MetShop()
        MeetMonsterPer()
        SightFunc()
    }
    } else if(e.key == "ArrowUp") {
        if(playerPosY > arcRadius) {
        playerPosY -= 50;
        MetShop()
        MeetMonsterPer()
        SightFunc()
    } 
    }

    if(e.key == "Enter") {
        console.log(tiles);
    }

       player.top = playerPosY - 20
       player.bottom = playerPosY + 20
       player.left = playerPosX - 20
       player.right = playerPosX + 20

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
    for(i = 0; i < tileRow; i++) {
        for(j = 0; j < tileCol; j++) {
            if(isCollisionRectToRect2(player, tiles[i][j])) {
                if(tiles[i][j].color == "blue") {
                    alert("blue");
                } else if(tiles[i][j].color == "green") {
                    alert("green!");
                }
            }
        }
    }
    let MeetPer = Math.floor(Math.random() * 16);                           
    if(MeetPer == 0 && 
      (playerPosX != Shop.left &&
       playerPosY != Shop.top)) {
    visibility1.style.visibility = "visible";
    visibility2.style.visibility = "visible";
    visibility3.style.visibility = "visible";   
    MeetPer = Math.floor(Math.random() * 8);
    alert("작은 몬스터를 만났습니다 가위 바위 보를 이기세요 (승리 시 : 0~ 100골드 랜덤 지급 , 패배 시 : HP -1 ");
    } else if (MeetPer == 1 && 
        (playerPosX != Shop.left &&
         playerPosY != Shop.top)) {
    alert("거대한 몬스터를 만났습니다. 몬스터와 같은 숫자를 입력하면 승리 ( 승리시 : 100 ~ 300골드 랜덤 지급, 패배시 HP -3"); 

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
    if(playerPosX == Shop.left &&
        playerPosY == Shop.top) {
            let buyportion1 = prompt("몇개의 포션을 구매 하시겠습니까? ( HP 1 회복, Gold : 50 소모 )") 
            let buyportion = parseInt(buyportion1) 
            if(Gold > buyportion * 50) {               
                HP += buyportion
                Gold -= buyportion * 50
            } else {                
                alert(`보유 골드가 부족합니다. `);
            }
        }                      
    }




function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawTiles()
    update()
    drawPlayer()
    drawShop()
    drawEscape()  
}



function drawPlayer() {
    let PlayerImage = new Image();
    PlayerImage.src = "player.png"
    PlayerImage.onload = function () {
    context.drawImage(PlayerImage,playerPosX - 20, playerPosY - 20, tileWidth, tileHeight);
}
}

function drawEscape() {
    let ExitImage = new Image();
    ExitImage.src = "Exit.png"
    ExitImage.onload = function () {
    context.drawImage(ExitImage, escapeRoom.left - 20, escapeRoom.top - 20, tileWidth, tileHeight);
    }
}

function drawShop() {
    let ShopImage = new Image();
    ShopImage.src = "shop.png"
    ShopImage.onload = function () {
    context.drawImage(ShopImage, Shop.left - 20, Shop.top - 20, tileWidth, tileHeight);
    }   
}

setTiles();
setInterval(draw, 100) 

