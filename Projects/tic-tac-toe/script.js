

const players = [
    {
        name: "Player 1",
        symbol: "X"
    },
    {
        name: "Player 2",
        symbol: "0"
    }
]

document.querySelector(".p1-name").textContent = players[0].name;
document.querySelector(".p1-symbol").textContent = players[0].symbol;

document.querySelector(".p2-name").textContent = players[1].name;
document.querySelector(".p2-symbol").textContent = players[1].symbol;

const allSquares = document.getElementsByClassName("square");
console.log(allSquares);