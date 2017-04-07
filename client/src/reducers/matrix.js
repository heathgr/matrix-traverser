/** @module reducers/matrix */
import { Map, List } from 'immutable';
import { SET_MATRIX, SET_MATRIX_CELL } from '../constants/actionTypes';

export const initialMatrix = Map({
  cells: List([
    Map({
      row: 0,
      column: 0,
      value: 2,
    }),
    Map({
      row: 0,
      column: 1,
      value: 7,
    }),
    Map({
      row: 1,
      column: 0,
      value: 4,
    }),
    Map({
      row: 1,
      column: 1,
      value: 9,
    }),
    Map({
      row: 2,
      column: 0,
      value: 3,
    }),
    Map({
      row: 2,
      column: 1,
      value: 8,
    }),
  ]),
  columnCount: 2,
});

const matrix = (state = initialMatrix, action) => {
  switch (action.type) {
    case SET_MATRIX: {
      return action.matrix;
    }
    case SET_MATRIX_CELL: {
      const cells = state.get('cells');
      const updateIndex = cells.findKey(
        value => value.get('row') === action.cell.row && value.get('column') === action.cell.column
      );
      const newCells = cells.set(updateIndex, Map(action.cell));

      return state.set('cells', newCells);
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
