document.addEventListener('DOMContentLoaded', ()=>{
    const cardArray = [
        {
            name: 'cheeseburger',
            img: './images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: './images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: './images/fries.png'
        },
        {
            name: 'fries',
            img: './images/fries.png'
        },
        {
            name: 'hotdog',
            img: './images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: './images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: './images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: './images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: './images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: './images/milkshake.png'
        },
        {
            name: 'pizza',
            img: './images/pizza.png'
        },
        {
            name: 'pizza',
            img: './images/pizza.png'
        },
    ]
    const grid = document.querySelector('.grid');
    var cardsChoosen = []
    var cardsChoosenId = []
    var stopper = 0;
        
// create grid-board
function createBoard(){
    
    if(grid.hasChildNodes()){
        while(grid.hasChildNodes()){
            grid.removeChild(grid.lastChild)
        }
    }
    for(let i=0; i<cardArray.length; i++){
        var card = document.createElement('img');
        card.setAttribute('src','images/blank.png');
        card.setAttribute('data-id', i);
        // Add event Listener to each Card
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
    // randomise the cardArray
    cardArray.sort(()=> 0.5 - Math.random())
}

// check for matches
function checkForMatch(){
    // get all the elements with TAG=img
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChoosenId[0]
    const optionTwoId = cardsChoosenId[1]
    
    // if a match is found i.e names are equal
    if(cardsChoosen[0] === cardsChoosen[1] ){
        // alert("It's a Match!");
        cards[optionOneId].setAttribute('src', 'images/grey.png');
        cards[optionTwoId].setAttribute('src', 'images/grey.png');
        // // detach eventListener
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        stopper++;
    }
    else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }
    // clear the cardsChoosen Array & cardsChoosenID Array
    cardsChoosen = []
    cardsChoosenId = []
    // if all the cards are collected
    if(stopper === cardArray.length/2){
        clearInterval(interval);
        alert('Congratulations! You Won');
        
        // RESET THE GAME
        newGame();
    }
}

// function to flip Card 
function flipCard(){
    var cardId = this.getAttribute('data-id');
    cardsChoosen.push(cardArray[cardId].name)
    cardsChoosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if(cardsChoosen.length >= 2){
        setTimeout(checkForMatch, 300);
    }
}

// START THE GAME {ENTRY-POINT}
createBoard()

// RESET GAME 
var reset = document.querySelector(".reset");
reset.addEventListener('click', newGame);

function newGame(){
    var prevDuration =  document.querySelector('.timer').textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()

    stopper = 0;

    var scoreBoard = document.querySelector('.scores');
    var div = document.createElement('div');
    div.innerHTML = prevDuration;
    scoreBoard.appendChild(div);
    createBoard();
    // console.log(prevDuration);

    clearInterval(interval);
    hours = 00;
    minutes = 00;
    seconds = 00;
    milliseconds = 00;
    h.innerHTML = "0" + hours;
    m.innerHTML = "0" + minutes;
    s.innerHTML = "0" + seconds;
    ms.innerHTML = "0" + milliseconds;
}
})

var hours = 00;
var minutes = 00;
var seconds = 00;
var milliseconds = 00;

var h = document.querySelector("#hours");
var m = document.querySelector("#minutes");
var s = document.querySelector("#seconds");
var ms = document.querySelector("#milliseconds");
var gridClick = document.querySelector('.grid');

let interval;

// STOPWATCH COUNTER
function startTimer(){
    milliseconds++;
    if(milliseconds < 10){
        ms.innerHTML = "0" + milliseconds;
    }
    if (milliseconds > 10){
        ms.innerHTML = milliseconds;
      }

    if (milliseconds > 99){
        seconds++;
        s.innerHTML = seconds;
        milliseconds = 0;
        ms.innerHTML = "0" + 0;
    }
    // add 0 
    if(seconds < 10){
        s.innerHTML = "0" + seconds;
    }
    // remove 0
    if(seconds > 10){
        s.innerHTML = seconds;
    }
    //Add a minute, reinitiate second count   
  if (seconds > 59){
    minutes++;
    m.innerHTML = minutes;
    seconds = 0;
    s.innerHTML = "0" + 0;
  }
 //Add 0 before minute count under 10 
  if (minutes < 10){
    m.innerHTML = "0" + minutes;
  }
 //Remove 0 above 10
  if (minutes > 10){
    m.innerHTML = minutes;
  }
 //Add a hour, reinitiate minute count 
  if (minutes > 59){
    hours++;
    h.innerHTML = hours;
    minutes = 0;
    m.innerHTML = "0" + 0;
  }
 //Add 0 if hour under 10
    if (hours < 10) {
    h.innerHTML = "0" + hours;
  }
}
gridClick.addEventListener('click', function(){
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
})

// PAUSE STOPWATCH
var pause = document.querySelector(".pause");
pause.addEventListener('click', ()=>{clearInterval(interval)});