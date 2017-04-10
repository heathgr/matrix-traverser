/** @module reducers/matrix */
import { List } from 'immutable';
import { GOT_SOLUTIONS } from '../constants/actionTypes';

const initialSolutions = List([]);

const solutions = (state = initialSolutions, action) => {
  switch (action.type) {
    case GOT_SOLUTIONS: {
      console.log('got solutions', action.solutions);
      return List(action.solutions);
    }
    default: {
      return state;
    }
  }
};

/**
 * The reducer that handles the solutions state.  Solutions is an immutable list of integers.  These integers corespond to cells on /matrix/cells.
 * @param {object} state - Optional, the matrix state.
 * @param {object} action - The action that will be performed on the solutions.
 * @return {object} The new solutions state.
 */
export default solutions;
