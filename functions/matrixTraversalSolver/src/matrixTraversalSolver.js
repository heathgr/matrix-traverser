const normalizeMatrix = require('./helpers/normalizeMatrix');
const initializePaths = require('./helpers/initializePaths');
const iteratePath = require('./helpers/iteratePath');

/** @module matrixTraversalSolver */

const matrixTraversalSolver = (simpleMatrix) => {
  const normalizedMatrix = normalizeMatrix(simpleMatrix);
  let paths = initializePaths(normalizedMatrix);
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
 * @param {simpleMatrix} - The matrix to be evaluated.
 * @returns {solution} - The solution to the matrix traversal.
 */
module.exports = matrixTraversalSolver;
