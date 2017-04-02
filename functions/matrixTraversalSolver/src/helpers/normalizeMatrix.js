const normalizeMatrix = ({ cells, columnCount }) => ({
  columnCount,
  rowCount: cells.length / columnCount,
  cells: cells.map(
    (cell, i) => ({
      column: i % columnCount,
      row: Math.floor(i / columnCount),
      value: cell,
    })
  ),
});

/**
 * Normalizes the matrix data to make it easier to process.
 * @param {simpleMatrix} simpleMatrix - The matrix that is to be normalized.
 * @returns {matrix}
 */
module.exports = normalizeMatrix;
