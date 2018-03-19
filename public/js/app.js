'use strict';
function prepareGame() {

  // Variables
  const deckWrapper = document.querySelector('.game-area');
  const deck = document.querySelector('.deck');
  const cards = [...(document.querySelectorAll('.card'))];
  const moves = document.querySelector('.moves');
  const completeModal = document.querySelector('.complete');
  const scorePanel = document.querySelector('.score-panel');
  const stars = document.querySelector('.stars');
  // const templateStar = document.querySelector('.template-star');

  let matched = 0;
  let numberOfMoves = 0;
  let currentlyOpened = [];
  let numberOfStars = 3;


  // Manage game and randomising
  // ---------------------------
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
    let randomCards = shuffle(cards);

    // append new card order to deck
    for(let card of randomCards) {
      deck.appendChild(card);
    }

    // attach the new deck to the DOM
    deckWrapper.appendChild(deck);
  }

  function restartGame(){
    // remove deck from DOM so that we do not have remove each individual card causing re-rendering.
    deckWrapper.removeChild(deck);

    // remove all card states
    for( let card of cards) {
      card.classList.remove('open', 'match', 'show');
    }

    // re-order cards
    randomiseCards();

    // reset tackers
    clearMoves();
    clearMacthed();
    clearStars();
    startGame();

    console.log('Game restarted!');
  }

  function createResetButton() {
    let resetButtons = document.querySelectorAll('.restart');
    for(let button of resetButtons){
      button.addEventListener('click', restartGame)
    }
  }

// Manage Moves
// ------------

  function clearMoves() {
    numberOfMoves = 0;
    moves.textContent = numberOfMoves;
  }

  function updateMoves() {
    numberOfMoves ++;
    moves.textContent = numberOfMoves;
  }

// Manage stars
// ------------

  function clearStars() {
    numberOfStars = 3;
    renderStars();
  }

  function createStar() {
    let starsIcon = document.createElement('i');
    starsIcon.classList.add('fa', 'fa-star');

    let starsTemplate = document.createElement('li');
    starsTemplate.classList.add('star');
    starsTemplate.appendChild(starsIcon);

    return starsTemplate;
  }

  function renderStars() {

    // get a refernce to all the current stars
    let currentStars = document.querySelectorAll('.star');
    // remove the stars element from the DOM
    stars.remove();

    // remove all the stars in the stars element
    for( let eachStar of currentStars) {
      eachStar.remove();
    }

    // create stars based on numberOfStars and add to wrapper ".stars"
    let i = numberOfStars;
    while(i != 0) {
      stars.appendChild(createStar());
      i--;
    }

    // insert ".stars" before the first child moves
    scorePanel.insertBefore(stars, moves);
  }

  function updateStars() {
    if(numberOfMoves <= 20) {
      numberOfStars = 3;
    } else if(numberOfMoves >= 21 && numberOfMoves <= 30){
      numberOfStars = 2;
    } else if(numberOfMoves >= 31){
      numberOfStars = 1;
    }

    renderStars();
  }

// Manage timer
// ------------





// Manage matched cards
// --------------------

  function clearMacthed() {
    matched = 0;
  }

  function updateMatched() {
    matched ++;
  }

  function finishGame(){
    completeModal.classList.add('show');
  }

  function startGame(){
    completeModal.classList.remove('show');
  }

  function checkCompletion() {
    if(matched === 8){
      finishGame();
    } else {
      return;
    }
  }


// Manage cards
// ------------

  function cardsMatched() {
    for( let opened of currentlyOpened) {
      opened.classList.add('match');
    }
    clearOpened();
    updateMatched();
    checkCompletion();
  }

  function clearOpened() {
    // remove open state on cards
    for( let opened of currentlyOpened) {
      opened.classList.remove('open', 'show');
    }
    // empty opened list
    currentlyOpened = [];
  }

  function checkCards() {
    if(currentlyOpened.length === 2){
      updateMoves();
      updateStars();

      // added timeout as cards are hidden too fast
      setTimeout(()=>{
        if(currentlyOpened[0].dataset.cardType === currentlyOpened[1].dataset.cardType) {
          cardsMatched();
          return;
        } else {
          clearOpened();
          return;
        }
      }, 350);

    } else {
      // return if there is only one card in list
      return;
    }
  }

  function updateOpenedList(currentCard) {
    currentlyOpened.push(currentCard);
    return;
  }

  // show card event handler
  function showCard(e) {
    e.stopPropagation();

    // event delegation so only cards run function
    if(e.target.matches('.card')){
      let thisCard = e.target;

      // check if this card is not open already
      if(thisCard != currentlyOpened[0] && thisCard != currentlyOpened[0]) {
        // Add card to list of currently opened cards
        updateOpenedList(thisCard);

        // Show the card
        thisCard.classList.add('show', 'open');

        // check to see if there is a match
        checkCards();
      } else {
        console.log('card is already open!');
      }

    } else {
      return;
    }
  }

  // Handle opening cards
  function setupCardToggle() {
    deck.addEventListener('click', showCard);
  }


  // -------------------------------------------------
  // Start game procedure
  document.removeEventListener('DOMContentLoaded', htmlLoad);
  createResetButton();
  setupCardToggle();

  restartGame();
  // END of prepareGame
};

function htmlLoad() {
  console.log("DOM fully loaded and parsed");
  prepareGame();
}

// Wait for html to load and parse
document.addEventListener("DOMContentLoaded", htmlLoad);

/*
  Check List
  ==========
  / shuffle cards
  / reset button
  / move counter
  / Create a list that holds all of your cards
  / show cards - add event listener
  / manage open cards - max 2
  / compare/ test cards
  / match card state
  / track move counter
  / update stars
  / reset stars
  / track score
  / display mesage when complete
  - track time to complete and return total time on completion
  / congrat modal
*/

/*
* Display the cards on the page
*   /- shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

/*
* /set up the event listener for a card. If a card is clicked:
*  /- display the card's symbol (put this functionality in another function that you call from this one)
*  /- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  /- if the list already has another card, check to see if the two cards match
*    /+ if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    /+ if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    /+ increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    /+ if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
