import { Map } from 'immutable';

/**
 * Calculates the x,y position of a matrix cell.
 * @param {integer} cellIndex - The index of a cell in the 'cells' list.
 * @param {integer} columnCount - The number of columns in the matrix.
 * @returns {map} - The position of a cell as a map in the following format: { x: x value, y: y value}.
 */
const calcMatrixCellPosition = (cellIndex, columnCount) => Map({
  x: cellIndex % columnCount,
  y: Math.floor(cellIndex / columnCount),
});

export default calcMatrixCellPosition;
