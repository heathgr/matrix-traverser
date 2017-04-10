/** @module matrixTraversalSolver */

const initializePaths = require('./helpers/initializePaths');
const iteratePath = require('./helpers/iteratePath');

const matrixTraversalSolver = (matrix) => {
  // const normalizedMatrix = normalizeMatrix(simpleMatrix);
  let paths = initializePaths(matrix);
  let completedPaths = [];
  let maxCompletedLength = 0;

  while (paths.length > 0) {
    let newMaxCompletedLength = maxCompletedLength;

    paths = paths
      .map(
        path => iteratePath(path, matrix)
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
  return completedPaths.map(path => path.cells);
};

/**
 * Finds a solution to the provided matrix.
 * @param {matrix} - The matrix to be evaluated.
 * @returns {solution} - The solution to the matrix traversal.
 */
module.exports = matrixTraversalSolver;
