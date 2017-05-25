/** @module reducers/root */
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { Map } from 'immutable';
import matrix, * as fromMatrix from './matrix';
import solutions, * as fromSolutions from './solutions';
import calcMatrixCellPosition from '../helpers/calcMatrixCellPosition';
import bezierPathFromMatrixPoints from '../helpers/bezierPathFromMatrixPoints';

const root = combineReducers({
  matrix,
  solutions,
});

/**
 * The selector for the matrix state.
 * @param {Object} state - The application state.
 */
export const getMatrix = state => fromMatrix.getMatrix(state.matrix);

/**
 * The selector for the solutions state.
 * @param {Object} state - The application state.
 * @return {List.<List.<Integer>>} - A list containing the traversal solutions.
 */
export const getSolutions = state => fromSolutions.getSolutions(state.solutions);
/**
 * The selector for the active solution
 * @param {Object} state - The application state.
 * @return {Integer} - The index of the active solution.
 */
export const getActiveSolution = state => fromSolutions.getActiveSolution(state.solutions);
/**
 * The selector for the preview solution
 * @param {Object} state - The application state.
 * @return {Integer} - The index of the preview solution.
 */
export const getPreviewSolution = state => fromSolutions.getPreviewSolution(state.solutions);

export const getSolutionPathsData = createSelector(
  [getMatrix, getSolutions],
  (matrixState, solutionsState) => {
    const columnCount = matrixState.get('columnCount');
    const solutionPoints = solutionsState.map(
      solution => solution.map(
        cellIndex => calcMatrixCellPosition(cellIndex, columnCount)
      )
    );
    const solutionPathsData = solutionPoints.map(
      solution => bezierPathFromMatrixPoints(solution, 4)
    );
    return solutionPathsData;
  }
);

export const getDetailedMatrix = createSelector(
  [getMatrix, getSolutions, getActiveSolution, getPreviewSolution],
  (matrixState, solutionsState, activeSolutionIndex, previewSolutionIndex) => {
    const matrixCells = matrixState.get('cells');
    const activeSolution = solutionsState.get(activeSolutionIndex);
    const previewSolution = solutionsState.get(previewSolutionIndex);
    const newMatrixCells = matrixCells.map(
      (cell, id) => {
        const activePosition = activeSolution ? activeSolution.indexOf(id) : null;
        const previewPosition = previewSolution ? previewSolution.indexOf(id) : null;

        return Map({
          value: cell,
          activePosition: activePosition > -1 ? activePosition : null,
          previewPosition: previewPosition > -1 ? previewPosition : null,
        });
      }
    );

    return matrixState.set('cells', newMatrixCells);
  }
);

/**
 * The root reducer for the app state.
 * @return {Object} The new app state.
 */
export default root;
