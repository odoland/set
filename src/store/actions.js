import {
  CLICK,
  CHECK_CLICKED, 
  STOP_FLASHES,
  INIT_CARDS,
  RESET_CLICKED,
} from './actionTypes.js';

export const initCards = (rows, cols) => ({
  type: INIT_CARDS,
  payload: { rows, cols }
});

export const resetClicked = () => ({type: RESET_CLICKED});

export const registerClick = idx => ({
  type: CLICK,
  payload: { idx }
});

export const checkClick = () => ({
  type: CHECK_CLICKED,
});

export const stopFlashes = () => ({
  type: STOP_FLASHES
});

