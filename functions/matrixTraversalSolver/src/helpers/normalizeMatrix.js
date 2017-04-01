/**
 * Normalizes the matrix data to make it easier to process.
 * @param {number[]} matrix - An array of integers that defines the matrix cells. The length of the array should be a multiple of the columnCount parameter.
 * @param {number} columnCount - An integer defining the number of columns in the matrix.
 * @returns {matrix}
 */
const normalizeMatrix = (matrix, columnCount) => ({
  columnCount,
  rowCount: matrix.length / columnCount,
  cells: matrix.map(
    (cell, i) => ({
      column: i % columnCount,
      row: Math.floor(i / columnCount),
      value: cell,
    })
  ),
});

module.exports = normalizeMatrix;
