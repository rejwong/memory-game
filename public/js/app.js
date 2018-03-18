'use strict';
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  // IF IE 11 use msMatchesSelector instead of Element.matches
  // Used for event delegation
  // if (!Element.prototype.matches) {
  //   Element.prototype.matches = Element.prototype.msMatchesSelector;
  // }
  // use is type and has class

  // Variables
  const deck = document.querySelector('.deck');
  const cards = [...(document.querySelectorAll('.card'))];
  // const moves = document.querySelector('.moves');
  // const complete = document.querySelector('.complete');
  // const stars = document.querySelector('.stars');
  // const templateStar = document.querySelector('.template-star');

  // let matched = 0;
  // let numberOfMoves = 0;
  // let currentlyOpened = [];
  // let numberOfStars = 3;

  /*
  * / Create a list that holds all of your cards
  */

  /*
  * Display the cards on the page
  *   /- shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function randomiseCards(){
    let newDeck = document.createDocumentFragment();
    let randomCards = shuffle(cards);
    // TODO: remove deck from DOM
    // GET Cards and randomise
    // Append new order to deck
    // append deck

    // Seems appendChild moves the DOM elements to the fragment
    for(let card of randomCards) {
      newDeck.appendChild(card);
    }

    deck.appendChild(newDeck);
    console.log(newDeck);
  }

  function restartGame(){
    for( let card of cards) {
      card.classList.remove('open', 'match', 'show');
    }
    randomiseCards();
    console.log('Game restarted!');
    // complete.classList.toggle('show');
    // clearOpened();
    // matched = 0;
    // clearMoves();
    // randomiseCards();
    // resetStars();
    // renderStars();
  }

  function createResetButton() {
    let resetButtons = document.querySelectorAll('.restart');
    for(let button of resetButtons){
      button.addEventListener('click', restartGame)
    }
  }

  function showCard(e) {
    e.stopPropagation();
    console.log('in show card');
    console.log(e);
    if(e.target.matches('.card')){
      let thisCard = e.target;
      console.log(thisCard);
      // updateOpenedList(thisCard);
      // checkCards();
    } else {
      return;
    }
  }

  function setupCardToggle() {
    var testVar1 = "hello I am still here";
    deck.addEventListener('click', showCard);
  }

  // function resetStars() {
  //   numberOfStars = 3;
  // }

  // function clearStars() {
  //   let allStars = document.querySelectorAll('.template-star');
  //   for(let star of allStars) {
  //     star.remove();
  //   }
  // }

  // function renderStars() {
  //   clearStars();
  //   let i = numberOfStars;
  //   while(i != 0) {
  //     stars.appendChild(templateStar.cloneNode(true));
  //     i--;
  //   }
  // }

  // function updateStars() {
  //   console.log('cal stars');
  //   if(numberOfMoves <= 3) {
  //     numberOfStars = 3;
  //   } else if(numberOfMoves <= 6 && numberOfMoves > 3){
  //     numberOfStars = 2;
  //   }else if(numberOfMoves <= 9 && numberOfMoves > 6){
  //     numberOfStars = 1;
  //   }
  //   renderStars();
  //   // console.log(numberOfStars);
  // }

  // function updateMatched() {
  //   matched ++;
  //   // TODO: getter and setter
  // }

  // function clearMoves() {
  //   numberOfMoves = 0;
  //   moves.textContent = numberOfMoves;
  // }

  // // TODO: getter and setter
  // function updateMoves() {
  //   numberOfMoves ++;
  //   moves.textContent = numberOfMoves;
  // }

  // function finishGame(){
  //   complete.classList.toggle('show');
  // }

  // function checkEnd() {
  //   if(matched === 8){
  //     finishGame();
  //   } else {
  //     return;
  //   }
  // }

  // function cardsMatched() {
  //   for( let opened of currentlyOpened) {
  //     opened.classList.add('match');
  //   }
  //   clearOpened();
  //   updateMatched();
  //   checkEnd();
  // }

  // function updateOpenedList(currentCard) {
  //   currentCard.classList.add('open', 'show');
  //   currentlyOpened.push(currentCard);
  //   return;
  // }

  // function clearOpened() {
  //   for( let opened of currentlyOpened) {
  //     opened.classList.remove('open', 'show');
  //   }
  //   currentlyOpened = [];
  // }

  // function checkCards() {
  //   if(currentlyOpened.length === 2){
  //     updateMoves();
  //     updateStars();
  //     // added timeout as cards are hidden too fast
  //     setTimeout(()=>{
  //       if(currentlyOpened[0].dataset.cardType === currentlyOpened[1].dataset.cardType) {
  //         cardsMatched();
  //         return;
  //       } else {
  //         clearOpened();
  //         return;
  //       }
  //     }, 500);

  //   } else {
  //     return;
  //   }
  // }

  function initShowCard() {
    deck.addEventListener('click', function(e){
      e.stopPropagation();
      if(e.target.matches('.card')){
        let thisCard = e.target;
        updateOpenedList(thisCard);
        checkCards();
      } else {
        return;
      }
    }, false);
  }

  // -------------------------------------------------

  createResetButton();
  setupCardToggle();

  restartGame();

  // Bind show card
  // initShowCard();

  // start a new game
  // restartGame();


  // END document ready
});

/*
  Check List
  ==========
  - create card template
  - shuffle cards
  - reset button
  - move counter
  - show cards - add event listener
  - manage open cards - max 2
  - compare/ test cards
  - match card state
  - track move counter
  - update stars
  - reset stars
  - track score
  - display mesage when complete
  - track time to complete and return total time on completion
  - congrat modal
*/

/*
* /set up the event listener for a card. If a card is clicked:
*  /- display the card's symbol (put this functionality in another function that you call from this one)
*  /- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  /- if the list already has another card, check to see if the two cards match
*    /+ if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    /+ if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    /+ increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
