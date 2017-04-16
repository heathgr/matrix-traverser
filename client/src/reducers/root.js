/** @module reducers/root */
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
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
 */
export const getSolutions = state => fromSolutions.getSolutions(state.solutions);

export const getSolutionPathsData = createSelector(
  [getMatrix, getSolutions],
  (matrixState, solutionsState) => {
    const columnCount = matrixState.get('columnCount');
    const solutionsPoints = solutionsState.map(
      solution => solution.map(
        cellIndex => calcMatrixCellPosition(cellIndex, columnCount)
      )
    );
    const solutionPathsData = solutionsPoints.map(
      solution => fromJS(bezierPathFromMatrixPoints(solution.toJS(), 4))
    );
    return solutionPathsData;
  }
);

/**
 * The root reducer for the app state.
 * @return {Object} The new app state.
 */
export default root;
