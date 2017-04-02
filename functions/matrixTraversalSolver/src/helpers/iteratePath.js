const getCellNeighbors = require('./getCellNeighbors');

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

/**
 * Iterates a path and divedes it into new paths if needed
 * @param {path} path The path to be iterated.
 * @param {matrix} matrix The matrix object that will be traversed.
 * @return {path[]} The result of the iteration.
 *
 */
module.exports = iteratePath;
