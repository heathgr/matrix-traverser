/** @module reducers/matrix */
import { List } from 'immutable';
import { GOT_SOLUTIONS } from '../constants/actionTypes';

export const initialSolutions = List([]);

const solutions = (state = initialSolutions, action) => {
  switch (action.type) {
    case GOT_SOLUTIONS: {
      return List(action.solutions);
    }
    default: {
      return state;
    }
  }
};

/**
 * Selector the matrix state.
 * @param {objct} state - The matrix state.
 */
export const getSolutions = state => state;

/**
 * The reducer that handles the solutions state.  Solutions is an immutable list of integers.  These integers corespond to cells on /matrix/cells.
 * @param {object} state - Optional, the matrix state.
 * @param {object} action - The action that will be performed on the solutions.
 * @return {object} The new solutions state.
 */
export default solutions;
