/** @module reducers/matrix */
import { List, Map } from 'immutable';
import {
  GOT_SOLUTIONS,
  FAILED_TO_GET_SOLUTIONS,
  RESET_SOLUTIONS,
  SET_ACTIVE_SOLUTION,
  SET_NEXT_ACTIVE_SOLUTION,
  SET_PREVIOUS_ACTIVE_SOLUTION,
  SET_PREVIEW_SOLUTION,
} from '../constants/actionTypes';

export const initialSolutions = Map({
  data: List([]),
  activeSolution: 0,
  previewSolution: null,
  error: null,
});

const solutions = (state = initialSolutions, action) => {
  switch (action.type) {
    case GOT_SOLUTIONS: {
      const newData = List(
        action.solutions.map(
          solution => List(solution)
        )
      );

      return state
        .set('data', newData)
        .set('activeSolution', 0)
        .set('previewSolution', null);
    }
    case SET_ACTIVE_SOLUTION: {
      const solutionCount = state.get('data').size;
      const nextActiveSolution = action.solution % solutionCount;

      return state.set('activeSolution', nextActiveSolution);
    }
    case FAILED_TO_GET_SOLUTIONS: {
      return state.set('error', action.error);
    }
    case SET_NEXT_ACTIVE_SOLUTION: {
      const currentActiveSolution = state.get('activeSolution');
      const solutionCount = state.get('data').size;
      const remainder = (currentActiveSolution + 1) % solutionCount;
      const nextActiveSolution = remainder < 0 ? solutionCount + remainder : remainder;

      return state.set('activeSolution', nextActiveSolution);
    }
    case SET_PREVIOUS_ACTIVE_SOLUTION: {
      const currentActiveSolution = state.get('activeSolution');
      const solutionCount = state.get('data').size;
      const remainder = (currentActiveSolution - 1) % solutionCount;
      const nextActiveSolution = remainder < 0 ? solutionCount + remainder : remainder;

      return state.set('activeSolution', nextActiveSolution);
    }
    case SET_PREVIEW_SOLUTION: {
      if (action.solution === null) return state.set('previewSolution', null);

      const solutionCount = state.get('data').size;
      const nextPreviewSolution = action.solution % solutionCount;

      return state.set('previewSolution', nextPreviewSolution);
    }
    case RESET_SOLUTIONS: {
      return initialSolutions;
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
export const getSolutions = state => state.get('data');
export const getActiveSolution = state => state.get('activeSolution');
export const getPreviewSolution = state => state.get('previewSolution');
export const getSolutionsError = state => state.get('error');

/**
 * The reducer that handles the solutions state.  Solutions is an immutable list of integers.  These integers corespond to cells on /matrix/cells.
 * @param {object} state - Optional, the matrix state.
 * @param {object} action - The action that will be performed on the solutions.
 * @return {object} The new solutions state.
 */
export default solutions;
