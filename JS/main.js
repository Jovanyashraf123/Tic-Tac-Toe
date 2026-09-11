const board = document.querySelector("#board")

for(let i = 0; i < 9 ; i++){
    
    let square = document.createElement("div")

    square.classList.add("square")

    board.appendChild(square);
}

const squares = document.querySelectorAll(".square");
const playerX = document.querySelector(".player-x");
const playerO = document.querySelector(".player-o");
const message = document.querySelector(".message");
const reset = document.querySelector("#reset");
const overlay = document.querySelector(".overlay");

let currentplayer = "X";

function handleClick(e){
    
    if(e.target.textContent ===""){
        e.target.textContent = currentplayer;
        e.target.classList.add(currentplayer.toLowerCase());

        if(checkforwinner()){

            message.innerHTML=currentplayer + "" +"WON"
            overlay.style.visibility = "visible"

        }else if(checkforTIE()){
            message.innerHTML = "DRAW"
            overlay.style.visibility = "visible"

        }else{
            currentplayer = currentplayer ==="X" ? "O": "X";
            playerX.classList.toggle("active")
            playerO.classList.toggle("active")
        }
    }
}

function checkforwinner(){
    const winingcombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let combo of winingcombos){
        if(
            squares[combo[0]].textContent === currentplayer &&
            squares[combo[1]].textContent === currentplayer &&
            squares[combo[2]].textContent === currentplayer
        ){
            squares[combo[0]].classList.add("winner");
            squares[combo[1]].classList.add("winner");
            squares[combo[2]].classList.add("winner");
            return true;
        }
    }
    return false;
}

function checkforTIE(){

    let filledsquares = 0;

    for(let square of squares){
        if(square.textContent !==""){
            filledsquares++
        }
    }
    if(filledsquares === squares.length){
        return true;
    }else{
        return false;
    }
}

function resetGame(){
    for(let square of squares){
        square.textContent = "";
        square.classList.remove("o" , "x" , "winner");
    }
    playerX.classList.add("active");
    playerO.classList.remove("active");

    overlay.style.visibility= "hidden";
    message.innerHTML = "";

    currentplayer = "X";
}
for(let square of squares){
    square.addEventListener("click", handleClick);
}
reset.addEventListener("click", resetGame);