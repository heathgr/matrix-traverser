/**
 * Calculates the x,y position of a matrix cell.
 * @param {integer} cellIndex - The index of a cell in the 'cells' array.
 * @param {integer} columnCount - The number of columns in the matrix.
 * @param {integer} cellCount - The number of cells in the matrix.
 * @returns {object} - The position of a cell in the following format: { x: x value, y: y value}.
 */
const calcMatrixCellPosition = (cellIndex, columnCount, cellCount) => {
  return {
    x: cellIndex % columnCount,
    y: Math.floor(cellIndex / columnCount),
  };
}

export default calcMatrixCellPosition;
