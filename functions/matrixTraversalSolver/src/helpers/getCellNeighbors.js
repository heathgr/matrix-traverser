/** @module getCellNeighbors */

const getCellNeighbors = (index, matrix) => {
  const cell = matrix.cells[index];
  const { rowCount, columnCount } = matrix;
  const onTopRow = cell.row === 0;
  const onBottomRow = cell.row === rowCount - 1;
  const onLeftColumn = cell.column === 0;
  const onRightColumn = cell.column === columnCount - 1;

  let neighbors = [];

  // add top neighbor
  if (!onTopRow) neighbors = [...neighbors, index - columnCount];
  // add top right neighbor
  if (!onTopRow && !onRightColumn) neighbors = [...neighbors, (index + 1) - columnCount];
  // add right neighbor
  if (!onRightColumn) neighbors = [...neighbors, index + 1];
  // add bottom right neighbor
  if (!onBottomRow && !onRightColumn) neighbors = [...neighbors, (index + 1) + columnCount];
  // add bottom neighbor
  if (!onBottomRow) neighbors = [...neighbors, index + columnCount];
  // add bottom left neighbor
  if (!onBottomRow && !onLeftColumn) neighbors = [...neighbors, (index - 1) + columnCount];
  // add left neighbor
  if (!onLeftColumn) neighbors = [...neighbors, index - 1];
  // add top left neighbor
  if (!onTopRow && !onLeftColumn) neighbors = [...neighbors, (index - 1) - columnCount];

  return neighbors;
};

/**
 * Returns an array containing the indecies of cells that are boardering the specified cell.
 * @param {number} index The index of the cell whose neighbors will be returned.
 * @param {matrix} matrix The matrix object that will be traversed.
 * @return {number[]} Returns an array containing the indecies of the cells neighboring the specified cell.
 */
module.exports = getCellNeighbors;
