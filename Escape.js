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
let HP = 10;
let Gold = 0;




let EscapePosX = 50 * Math.floor(Math.random() * 9)
let EscapePosY = 50 * Math.floor(Math.random() * 9)
let ShopPosX = 50 * Math.floor(Math.random() * 9)
let ShopPosY = 50 * Math.floor(Math.random() * 9)

let visibility1 = document.getElementById("Button1");
let visibility2 = document.getElementById("Button2");
let visibility3 = document.getElementById("Button3");
let Gvisibility1 = document.getElementById("2LButton1");
let Gvisibility2 = document.getElementById("2LButton2");
let Gvisibility3 = document.getElementById("2LButton3");
let LGvisibility1 = document.getElementById("3LButton1");
let LGvisibility2 = document.getElementById("3LButton2");
let LGvisibility3 = document.getElementById("3LButton3");
let Bvisibility1 = document.getElementById("4LButton1");
let Bvisibility2 = document.getElementById("4LButton2");
let Bvisibility3 = document.getElementById("4LButton3");
let Level1 = document.getElementById("Level1");
let Level2 = document.getElementById("Level2");
let Level3 = document.getElementById("Level3");
let Level4 = document.getElementById("Level4");


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
            else {
                tiles[i][j].sight = false;
                if(tiles[i][j].sight == false) {
                    tiles[i][j].color = "black";
                }
            }

            // if(isCollisionRectToRect2(player, tiles[i][j])) {
            //     tiles[i][j].visit = true;
            //     if(tiles[i][j].visit == true) {
            //         tiles[i][j].color = "grey";
            //     }
            // }
        }
    }
}


document.addEventListener('keydown', keyDownEventHandler);

function isCollisionRectToRect(rectA, rectB) {
    if (rectA.left > rectB.right + 25 ||
        rectA.right + 25 < rectB.left ||
        rectA.top > rectB.bottom + 25 ||
        rectA.bottom + 25 < rectB.top) {
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
    }
    } else if(e.key == "ArrowLeft") {      
        if(playerPosX > arcRadius) {
        playerPosX -= 50;
        MetShop()       
    }
    } else if(e.key == "ArrowDown") {
        if(playerPosY < MaxCan) {
        playerPosY += 50;
        MetShop()        
    }
    } else if(e.key == "ArrowUp") {       
        if(playerPosY > arcRadius) {
        playerPosY -= 50;
        MetShop()              
    } 
    }
    

    if(e.key == "Enter") {
        console.log(tiles);
    }

       player.top = playerPosY - 20
       player.bottom = playerPosY + 20
       player.left = playerPosX - 20
       player.right = playerPosX + 20
       MeetMonsterPer()
       SightFunc()
       
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
    visibility1.style.display = "none";
    visibility2.style.display = "none";
    visibility3.style.display = "none";
    Level1.style.display = "none"
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
    visibility1.style.display = "none";
    visibility2.style.display = "none";
    visibility3.style.display = "none";
    Level1.style.display = "none"
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
    visibility1.style.display = "none";
    visibility2.style.display = "none";
    visibility3.style.display = "none";
    Level1.style.display = "none"
}

function scissors2() {
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
        Gold += 50 + Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 2;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    Gvisibility1.style.display = "none";
    Gvisibility2.style.display = "none";
    Gvisibility3.style.display = "none";
    Level2.style.display = "none"
    
}

function Rock2() {
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
        Gold += 50 + Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 2;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    Gvisibility1.style.display = "none";
    Gvisibility2.style.display = "none";
    Gvisibility3.style.display = "none";
    Level2.style.display = "none"
}

function Paper2() {
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
        Gold += 50 + Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 2;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    Gvisibility1.style.display = "none";
    Gvisibility2.style.display = "none";
    Gvisibility3.style.display = "none";
    Level2.style.display = "none"
}

function scissors3() {
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
        Gold += 100 + Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 3;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    LGvisibility1.style.display = "none";
    LGvisibility2.style.display = "none";
    LGvisibility3.style.display = "none";
    Level3.style.display = "none"
}

function Rock3() {
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
        Gold += 100 + Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 3;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    LGvisibility1.style.display = "none";
    LGvisibility2.style.display = "none";
    LGvisibility3.style.display = "none";
    Level3.style.display = "none"
}

function Paper3() {
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
        Gold += 100 + Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 3;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    LGvisibility1.style.display = "none";
    LGvisibility2.style.display = "none";
    LGvisibility3.style.display = "none";
    Level3.style.display = "none"
}

function scissors4() {
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
        Gold += 200 + Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 5;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    Bvisibility1.style.display = "none";
    Bvisibility2.style.display = "none";
    Bvisibility3.style.display = "none";
    Level4.style.display = "none"
}

function Rock4() {
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
        Gold += 200 + Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 5;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    Bvisibility1.style.display = "none";
    Bvisibility2.style.display = "none";
    Bvisibility3.style.display = "none";
    Level4.style.display = "none"
}

function Paper4() {
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
        Gold += 200 + Math.floor(Math.random() * 100)
        PlayerGold() 
    } else if (result == "Lose") {
        HP -= 5;
        PlayerHP() 
    }
    RCPAnswer = Math.floor(Math.random() * 3);
    Bvisibility1.style.display = "none";
    Bvisibility2.style.display = "none";
    Bvisibility3.style.display = "none";
    Level4.style.display = "none"
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
                let MeetPer = Math.floor(Math.random() * 8); 
                if(tiles[i][j].color == "blue" && MeetPer == 0 && (playerPosX != Shop.left && playerPosY != Shop.top)) {
                    visibility1.style.display = "";
                    visibility2.style.display = "";
                    visibility3.style.display = "";
                    Level1.style.display = ""
                    alert("파란타일의 1레벨 몬스터를 만났습니다! (승리시 0 ~ 100골드 랜덤 획득 패배시 HP - 1");
                } else if(tiles[i][j].color == "green" && MeetPer == 2 && (playerPosX != Shop.left && playerPosY != Shop.top)) {
                    Gvisibility1.style.display = "";
                    Gvisibility2.style.display = "";
                    Gvisibility3.style.display = "";
                    Level2.style.display = ""
                    alert("초록타일의 2레벨 몬스터를 만났습니다! (승리시 50 ~ 150골드 랜덤 획득 패배시 HP - 2");
                } else if(tiles[i][j].color == "lightgreen" && MeetPer == 5 && (playerPosX != Shop.left && playerPosY != Shop.top)) {
                    LGvisibility1.style.display = "";
                    LGvisibility2.style.display = "";
                    LGvisibility3.style.display = "";
                    Level3.style.display = ""
                    alert("연두타일의 3레벨 몬스터를 만났습니다! (승리시 100 ~ 200골드 랜덤 획득 패배시 HP - 3" )
                } else if(tiles[i][j].color == "brown" && MeetPer == 7 && (playerPosX != Shop.left && playerPosY != Shop.top)) {
                    Bvisibility1.style.display = "";
                    Bvisibility2.style.display = "";
                    Bvisibility3.style.display = "";
                    Level4.style.display = "";
                    alert("갈색타일의 4레벨 몬스터를 만났습니다! (승리시 200 ~ 300골드 랜덤 획득 패배시 HP - 5")                    
                } else {
                    visibility1.style.display = "none";
                    visibility2.style.display = "none";
                    visibility3.style.display = "none";
                    Gvisibility1.style.display = "none";
                    Gvisibility2.style.display = "none";
                    Gvisibility3.style.display = "none";
                    LGvisibility1.style.display = "none";
                    LGvisibility2.style.display = "none";
                    LGvisibility3.style.display = "none";
                    Bvisibility1.style.display = "none";
                    Bvisibility2.style.display = "none";
                    Bvisibility3.style.display = "none";
                    Level1.style.display = "none";
                    Level2.style.display = "none";
                    Level3.style.display = "none";
                    Level4.style.display = "none";
                }              
                MeetPer = Math.floor(Math.random() * 8);
            }
        }
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
    update()
    drawPlayer()
    drawShop()
    drawEscape()  
    drawTiles()
}



function drawPlayer() {
    let PlayerImage = new Image();
    PlayerImage.src = "player.png"
    PlayerImage.onload = function () {
    context.drawImage(PlayerImage,playerPosX - 20, playerPosY - 20, tileWidth, tileHeight);
}
}

function drawEscape() {
    context.beginPath();
    context.arc(escapeRoom.left, escapeRoom.top, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

function drawShop() {
    context.beginPath();
    context.arc(escapeRoom.left, escapeRoom.top, arcRadius, 0, 2 * Math.PI);
    context.fillStyle = 'yellow';
    context.fill();
    context.closePath(); 
}

setTiles();
setInterval(draw, 100) 

