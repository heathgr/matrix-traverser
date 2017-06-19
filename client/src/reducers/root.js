/** @module reducers/root */
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import matrix, * as fromMatrix from './matrix';
import solutions, * as fromSolutions from './solutions';
import ui, * as fromUI from './ui';
import calcMatrixCellPosition from '../helpers/calcMatrixCellPosition';
import {
  calcVectorFromPoints,
  rotateVector90,
  multiplyVectorByScalar,
  addVectors,
} from '../helpers/vectorMath';
import bezierPathFromMatrixPoints from '../helpers/bezierPathFromMatrixPoints';

const root = combineReducers({
  matrix,
  solutions,
  ui,
});

export const getIsCreateMatrixUIVisible = state => fromUI.getIsCreateMatrixUIVisible(state.ui);
export const getIsIntroductionUIVisible = state => fromUI.getIsIntroductionUIVisible(state.ui);

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

export const getMatrixWithPositionOffsets = createSelector(
  [getMatrix, getSolutions],
  (matrixState, solutionState) => {
    const matrixCells = matrixState.get('cells');
    const columnCount = matrixState.get('columnCount');
    const newMatrixCells = matrixCells.map(
      (cell, cellId) => Map({
        value: cell,
        position: calcMatrixCellPosition(cellId, columnCount),
      })
    );
    const matrixCellPositionOffsets = matrixCells.map(
      (cell, cellId) => Map({
        value: cell,
        positions: solutionState
          .map(
            // find out what solutions pass through a given cell
            (solution, solutionId) => (solution.includes(cellId) ? solutionId : null)
          )
          .filter(
            // filter out null results from the previous map function
            solutionId => solutionId !== null
          )
          .map(
            // find the soution normal/direction
            (solutionId) => {
              const solution = solutionState.get(solutionId);
              const solutionPosition = solution.indexOf(cellId);
              const position = newMatrixCells.get(cellId).get('position');

              if (solutionPosition === 0 || solutionPosition === solution.size - 1) {
                return Map({
                  solution: solutionId,
                  position,
                  normal: Map({
                    x: 0,
                    y: 0,
                  }),
                });
              }

              const previousCellId = solution.get(solutionPosition - 1);
              const previousCellPosition = newMatrixCells.get(previousCellId).get('position');
              const nextCellId = solution.get(solutionPosition + 1);
              const nextCellPosition = newMatrixCells.get(nextCellId).get('position');

              return Map({
                solution: solutionId,
                position,
                normal: calcVectorFromPoints(nextCellPosition, previousCellPosition),
              });
            }
          )
          .groupBy(
            solution => Map({
              normal: solution.get('normal'),
              position: solution.get('position'),
            })
          )
          .map(
            (normalGroup, groupData) => {
              if (normalGroup.size === 1) {
                return List([
                  Map({
                    position: groupData.get('position'),
                    solution: normalGroup.first().get('solution'),
                  }),
                ]);
              }
              const offsetNormal = rotateVector90(groupData.get('normal'));
              const position = groupData.get('position');
              const offsetSize = 0.035;
              const offsetAnchor = addVectors(multiplyVectorByScalar(offsetNormal, offsetSize * -0.5), position);
              const offsetVector = multiplyVectorByScalar(offsetNormal, offsetSize / (normalGroup.size - 1));
              const offsetPositions = normalGroup.map(
                (group, id) => Map({
                  position: addVectors(offsetAnchor, multiplyVectorByScalar(offsetVector, id)),
                  solution: group.get('solution'),
                })
              );

              return offsetPositions;
            }
          )
          .toList()
          .flatten(true),
      })
    );

    return matrixState.set('cells', matrixCellPositionOffsets);
  }
);

export const getSolutionPathsData = createSelector(
  [getMatrixWithPositionOffsets, getSolutions],
  (matrixState, solutionsState) => {
    const matrixCells = matrixState.get('cells');

    const solutionPoints = solutionsState.map(
      (solution, solutionId) => solution.map(
        (cellId) => {
          return matrixCells
            .get(cellId)
            .get('positions')
            .find(
              position => position.get('solution') === solutionId
            )
            .get('position');
        }
      )
    );
    const solutionPathsData = solutionPoints.map(
      solution => bezierPathFromMatrixPoints(solution, 4.5)
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
