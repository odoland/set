import SetCards from '../helpers/setcard';
import {
  CLICK,
  CHECK_CLICKED, 
  STOP_FLASHES,
  INIT_CARDS,
  RESET_CLICKED,
} from './actionTypes.js';

const DEFAULT_STATE = {
  cards: [], // Stores { shape, fill, color, count, id}
  clicked: [], // Array storing indices of clicked cards, max 3
  score: 0,
  status: "", // "right", "wrong", or "" (neutral)
  time: 0
};


function setgameReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CLICK:
      return clickHandler(state, action);
    case CHECK_CLICKED:
      return checkClickedHandler(state, action);
    case STOP_FLASHES:
      return stopFlashesHandler(state, action);
    case INIT_CARDS:
      return initCardsHandler(state, action);
    case RESET_CLICKED:
      return resetClickedHandler(state, action);
    default:
      return state;
  }
}

/** Registers a click of a card.
 * Pushes index of the clicked card to the state.clicked
 */
function clickHandler(state, action) {

  const { idx } = action.payload;
  const isClicked = state.clicked.includes(idx);
  const clicked = isClicked ? state.clicked.filter(i => i !== idx) : [...state.clicked, idx];
  return { ...state, clicked };
}

/** Checks if the three clicked card indices are a set.
 * If it is a set, draw new cards and increment score
 * else, flash "red" for incorrect
 */
function checkClickedHandler(state, action) {

  const { clicked, cards, score } = state;
  if (clicked.length < 3) return state; // Don't need to check for a set if they didn't click enough cards

  // Grab card objects
  const cardsSelected = clicked.map(idx => cards[idx]);

  // Found a set 
  if (SetCards.isASet(cardsSelected)) {
    const newCards = drawNewCards(state);
    console.log("Correct!")
    return {
      ...state,
      cards: newCards,
      score: score + 1,
      status: "right"
    }
  } else { // Invalid set
    console.log("Wrong!");
    return { ...state, status: "wrong" };
  }
}

/** Helper to draw new cards - to be used when a valid set is found */
function drawNewCards(state) {

  const { clicked, cards } = state;
  const cardsSelected = clicked.map(idx => cards[idx]);

  // Draw new cards, remove cards selected. 
  const usedSet = new Set(cards.map(c => c.id));
  const newCards = SetCards.generateRandomCards(3, usedSet);
  const oldCards = cards.filter(c => !cardsSelected.includes(c));

  return [...oldCards, ...newCards];
}

/**
 * Resets the status and empties the cards clicked.
 */
function stopFlashesHandler(state, action) {
  // Stops flashes and resets clicked
  const shouldResetFlash = state.clicked.length === 3 && state.status !== '';
  if (shouldResetFlash) {
    return { ...state, status: '', clicked: [] };
  } else {
    return state;
  }
}

/**
 * Initializes the cards
 */
function initCardsHandler(state, action) {
  const { rows, cols } = action.payload;

  const cards = SetCards.generateRandomCards(rows * cols); // col

  return { ...state, cards };
}

function resetClickedHandler(state, action) {
  return { ...state, clicked: [], status: '' };
}

export default setgameReducer;