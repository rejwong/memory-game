'use strict';
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  // IF IE 11 use msMatchesSelector instead of Element.matches
  // Used for event delegation
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }

  // Variables
  const deck = document.querySelector('.deck');
  const moves = document.querySelector('.moves');
  const cards = [...(document.querySelectorAll('.card'))];

  let matched = 0;
  let numberOfMoves = 0;
  let currentlyOpen = [];

  /*
  * Create a list that holds all of your cards
  */

  /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
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
    // TODO: remove this as they will be generated
    for(let card of cards) {
      deck.removeChild(card);
    };

    let randomCards = shuffle(cards);

    for(let card of randomCards) {
      deck.appendChild(card);
    }
  }

  function restartGame(){
    for( let card of cards) {
      card.classList.remove('open', 'match', 'show');
    }
    clearOpened();
    matched = 0;
    clearMoves();
    randomiseCards();
  }

  function initRestart() {
    let resetButton = document.querySelector('.restart');
    resetButton.addEventListener('click', () => {
      restartGame();
    })
  }

  function updateMatched() {
    // TODO: getter and setter
  }

  function clearMoves() {
    numberOfMoves = 0;
    moves.textContent = numberOfMoves;
  }

  // TODO: getter and setter
  function updateMoves() {
    numberOfMoves ++;
    moves.textContent = numberOfMoves;
  }

  function cardsMatched() {
    for( let opened of currentlyOpen) {
      opened.classList.add('match');
    }
    updateMatched();
    updateMoves();
    clearCards();
  }

  function clearOpened() {
    for( let opened of currentlyOpen) {
      opened.classList.remove('open', 'show');
    }
    currentlyOpen = [];
  }

  function checkCards() {
    if(currentlyOpen.length === 2){
      updateMoves();
      // added timeout as card are hidden too fast
      setTimeout(()=>{
        if(currentlyOpen[0].dataset.cardType === currentlyOpen[1].dataset.cardType) {
          cardsMatched();
          return;
        } else {
          clearOpened();
          return;
        }
      }, 500);

    } else {
      return;
    }
  }

  function initShowCard() {
    deck.addEventListener('click', function(e){
      e.stopPropagation();
      if(e.target.matches('.card')){
        // TODO: check it is not an open card
        e.target.classList.add('open', 'show');
        currentlyOpen.push(e.target);
        checkCards();
      } else {
        return;
      }
    }, false);
  }

  // -------------------------------------------------

  // randomiseCards();

  // restart button
  initRestart();

  // Bind show card
  initShowCard();

  // start a new game
  restartGame();

  // END document ready
});


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
