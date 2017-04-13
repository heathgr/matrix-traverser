/** @module reducers/root */
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import matrix, * as fromMatrix from './matrix';
import solutions from './solutions';

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
 * A selector that retrieves the matrix state as a simple matrix object.
 * A simple matrix differs from a regular matrix in that the "cells" property is an array of integers that define the cell values.
 * No column or row information is provided.
 * This selector returns an object literal as opposed to an immutable map.
 */
export const getSimpleMatrix = createSelector(
  getMatrix,
  matrixState => matrixState.update(
    'cells',
    cells => cells.map(
      cell => cell.get('value')
    ),
  )
  .delete('rowCount')
  .toJS(),
);

/**
 * The root reducer for the app state.
 * @return {Object} The new app state.
 */
export default root;
