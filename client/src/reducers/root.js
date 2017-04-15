/** @module reducers/root */
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import matrix, * as fromMatrix from './matrix';
import solutions, * as fromSolutions from './solutions';

const root = combineReducers({
  matrix,
  solutions,
});

/**
 * The selector for the matrix state.
 * @param {Object} state - The application state.
 */
export const getMatrix = state => fromMatrix.getMatrix(state.matrix);

/**
 * The selector for the solutions state.
 * @param {Object} state - The application state.
 */
export const getSolutions = state => fromSolutions.getSolutions(state.solutions);

/**
 * The root reducer for the app state.
 * @return {Object} The new app state.
 */
export default root;
