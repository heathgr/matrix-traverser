const normalizeMatrix = require('./helpers/normalizeMatrix');

/**
 * @typedef {Object} cells
 *
 * @property {number} column An integer referencing the column the cell is on.
 * @property {number} row An integer referencing the row the cell is on.
 * @property {number} value An integer referencing the value of the cell.
 */

/**
 * @typedef {Object} matrix
 *
 * @static
 * @property {number} columnCount - An integer referencing the number of columns in the matrix.
 * @property {number} rowCount - An integer referencing the number of rows in the matrix.
 * @property {cells[]} cells - An array of matrix cells.
 */

/**
 * @typedef {Object} path
 *
 * @property {number[]} cells - An array of integers that defines a path.  Each array element is the index of a cell in a matrix object.
 * @property {boolean} isComplete - If set to true, significes that a path is complete and can no longer traverse any cells in the matrix.
 */

/**
 * @typedef {Object} solution
 *
 * @property {matrix} matrix - The matrix that was traversed.
 * @property {number[][]} solutions - The solution(s) to the matrix traversal. An individual solution will be array of indecies referencing cells in the matrix property.
 */

/** @module matrixTraversalSolver */

/**
 * Initializes the path objects.  Initially, there is one path per matrix cell.
 * @param {matrix} matrix The matrix object that will be traversed.
 * @return {path[]} An array of the initial path objects
 */
const initializePaths = matrix => matrix.cells.map(
  (cell, i) => ({
    cells: [i],
    isComplete: false,
  })
);

/**
 * Returns an array containing the indecies of cells that are boardering the specified cell.
 * @param {number} index The index of the cell whose neighbors will be returned.
 * @param {matrix} matrix The matrix object that will be traversed.
 * @return {number[]} Returns an array containing the indecies of the cells neighboring the specified cell.
 */
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
 * Iterates a path and divedes it into new paths if needed
 * @param {path} path The path to be iterated.
 * @param {matrix} matrix The matrix object that will be traversed.
 * @return {path[]} The result of the iteration.
 *
 */
const iteratePath = (path, matrix) => {
  const lastCell = path.cells[path.cells.length - 1];
  const lastCellValue = matrix.cells[lastCell].value;
  const neighborCells = getCellNeighbors(lastCell, matrix)
    // determines if neighboring cells are traversable
    .filter(
      (neighbor) => {
        const neighborCellValue = matrix.cells[neighbor].value;

        // the neighbor is not traversable if it's value is less than the current cell
        // the neighbor is not traversable it is already in the path
        return !path.cells.includes(neighbor) && neighborCellValue >= lastCellValue;
      }
    );

  // if there are no valid neighbors then the path is complete
  if (neighborCells.length === 0) return [Object.assign({}, path, { isComplete: true })];

  const newPaths = neighborCells.map(
    neighbor => ({
      cells: [...path.cells, neighbor],
      isComplete: false,
    })
  );

  return newPaths;
};

const matrixTraversalSolver = ({ matrix, columnCount }) => {
  const normalizedMatrix = normalizeMatrix(matrix, columnCount);
  let paths = initializePaths(normalizedMatrix, columnCount);
  let completedPaths = [];
  let maxCompletedLength = 0;

  while (paths.length > 0) {
    let newMaxCompletedLength = maxCompletedLength;

    paths = paths
      .map(
        path => iteratePath(path, normalizedMatrix)
      )
      // iterate paths returns an array, so the paths array needs to be flattened
      .reduce(
        (prev, current) => [...prev, ...current],
        []
      );
    const newCompletedPaths = paths.filter(path => path.isComplete);
    if (newCompletedPaths.length > 0) {
      newMaxCompletedLength = newCompletedPaths.reduce(
        (prev, current) => (current.cells.length > prev ? current.cells.length : prev),
        newMaxCompletedLength
      );
    }
    // filter out paths that are not the solution
    completedPaths = [
      ...completedPaths,
      ...newCompletedPaths,
    ].filter(
      path => path.cells.length === newMaxCompletedLength
    );
    // filter out completed paths
    paths = paths.filter(path => !path.isComplete);
    maxCompletedLength = newMaxCompletedLength;
  }
  return {
    matrix: normalizedMatrix,
    solutions: completedPaths.map(path => path.cells),
  };
};

/**
 * Finds a solution to the provided matrix.
 * @param {number[]} matrix - An array of integers defining the matrix.  The length of the array should be a muliple of the columnCount parameter.
 * @param {number} columnCount - An integer defining the number of columns in the matrix.
 * @returns {solution} - The solution to the matrix traversal.
 */
module.exports = matrixTraversalSolver;
