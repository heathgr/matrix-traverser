/** @module reducers/matrix */
import { List } from 'immutable';

const initialSolutions = List([]);

const solutions = (state = initialSolutions, action) => {
  switch (action.type) {
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
