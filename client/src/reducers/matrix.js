/** @module reducers/matrix */
import { Map, List } from 'immutable';
import { SET_MATRIX } from '../constants/actionTypes';

export const initialMatrix = Map({
  cells: List([0, 6, 2, 1, 9, 2]),
  columnCount: 2,
});

const matrix = (state = initialMatrix, action) => {
  switch (action.type) {
    case SET_MATRIX: {
      return action.matrix;
    }
    default: {
      return state;
    }
  }
};

/**
 * The reducer that handles the matrix state.  The matrix is an immutable map that contains two keys:
 * - cells: A list of the matrix cells.
 * - columnCount: An integer theat specifies the number of columns in the matrix.
 *
 * Matrix cells are immutable maps that contain the following keys:
 * - column: An integer that specifies the column of the cell.
 * - row: An integer that specifies the row of the cell.
 * - value: An integer that specifies the value of the cell.
 * @param {object} state - Optional, the matrix state.
 * @param {object} action - The action that will be performed on the matrix.
 * @return {object} The new matrix state.
 */
export default matrix;
