const initializePaths = matrix => matrix.cells.map(
  (cell, i) => ({
    cells: [i],
    isComplete: false,
  })
);

/**
 * Initializes the path objects.  Initially, there is one path per matrix cell.
 * @param {matrix} matrix The matrix object that will be traversed.
 * @return {path[]} An array of the initial path objects
 */
module.exports = initializePaths;
