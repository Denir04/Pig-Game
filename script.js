'use strict'
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');

const elScoreP1 = document.querySelector('#score--0');
const elScoreP2 = document.querySelector('#score--1');
const elCurrentP1 = document.querySelector('#current--0');
const elCurrentP2 = document.querySelector("#current--1");

const btnNewGame = document.querySelector('.new-game');
const btnRollDice = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');


const elDice = document.querySelector('.dice');
const elDots = document.querySelectorAll('.dot');

const score = [0,0];
let currentScore = 0;
let activedPlayer = 0;

const possiblesDices = [
    [0,0,0,
     0,1,0,
     0,0,0],

    [1,0,0,
     0,0,0,
     0,0,1],

    [1,0,0,
     0,1,0,
     0,0,1],

    [1,0,1,
     0,0,0,
     1,0,1],
   
    [1,0,1,
     0,1,0,
     1,0,1],
   
    [1,0,1,
     1,0,1,
     1,0,1],
]


const createDice = arr => {
    elDice.classList.remove('hidden');
    for(let i=0;i<elDots.length;i++){
        if(arr[i] === 0) elDots[i].classList.add('invisible');
        else elDots[i].classList.remove('invisible');
    }
}

const changeTurn = () => {
    currentScore = 0;
    playerOne.classList.toggle("turn");
    playerTwo.classList.toggle("turn");
    document.querySelector(`#current--${activedPlayer}`).textContent = 0;
    activedPlayer = activedPlayer === 0 ? 1 : 0;
}

const checkWinner = () => {
    if(score[activedPlayer] >= 100){
        document.querySelector(`.player--${activedPlayer}`).classList.add("winner");
        btnHold.disabled = true;
        btnRollDice.disabled = true;
    }else changeTurn();
}


btnNewGame.addEventListener('click', () => {
    score[0] = 0;
    score[1] = 0;
    currentScore = 0;
    activedPlayer = 0
    elScoreP1.textContent = score[0];
    elScoreP2.textContent = score[1];
    elCurrentP1.textContent = currentScore;
    elCurrentP2.textContent = currentScore;
    elDice.classList.add("hidden");
    playerOne.classList.remove('winner');
    playerTwo.classList.remove('winner');
    btnHold.disabled = false;
    btnRollDice.disabled = false;
})

btnRollDice.addEventListener('click', () => {
    const numberDice = Math.trunc(Math.random()*6)+1;
    createDice(possiblesDices[numberDice-1]);
    if(numberDice === 1) changeTurn();
    else{
        currentScore+=numberDice;
        document.querySelector(`#current--${activedPlayer}`).textContent=currentScore;
    }
})

btnHold.addEventListener('click', () => {
    score[activedPlayer] += currentScore;
    currentScore = 0;
    document.querySelector(`#score--${activedPlayer}`).textContent = score[activedPlayer];
    document.querySelector(`#current--${activedPlayer}`).textContent = currentScore;
    checkWinner();
})


