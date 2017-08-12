import { expect } from 'chai';
import { is, fromJS } from 'immutable';
import root, {
  getActiveSolution,
  getMatrix,
  getSolutions,
  getSolutionPathsData,
  getMatrixWithPositionOffsets,
  getDetailedMatrix,
  getStatusMessage,
} from '../../src/reducers/root';
import { initialMatrix } from '../../src/reducers/matrix';
import { initialSolutions } from '../../src/reducers/solutions';
import { initialUIState } from '../../src/reducers/ui';
import { initialStatusMessageState } from '../../src/reducers/statusMessage';

describe('Root Reducer', () => {
  const state = root(undefined, { type: '@@INIT' });
  const expectedState = {
    matrix: initialMatrix,
    solutions: initialSolutions,
    ui: initialUIState,
    statusMessage: initialStatusMessageState,
  };

  it('Should compose the matrix, solutions, UI, and statusMessage reducers.', () => {
    Object.keys(state).forEach(
      key => expect(is(state[key], expectedState[key])).to.equal(true)
    );
  });

  it('Should have a get status message selector.', () => {
    expect(
      is(getStatusMessage(state), initialStatusMessageState.get('messageType'))
    ).to.equal(true);
  });

  it('Should have a matrix selector.', () => {
    expect(
      is(getMatrix(state), initialMatrix)
    ).to.equal(true);
  });

  it('Should have a solutions selector.', () => {
    expect(
      is(getSolutions(state), initialSolutions.get('data'))
    ).to.equal(true);
  });

  it('Should have an acive solutions selector.', () => {
    expect(
      is(getActiveSolution(state), 0)
    ).to.equal(true);
  });

  it('Should have a solutions path data selector.', () => {
    const testState = {
      matrix: fromJS({
        cells: [1, 2, 3, 4],
        columnCount: 2,
        rowCount: 2,
      }),
      solutions: fromJS({
        data: [
          [0, 1, 2, 3],
        ],
      }),
    };
    const expectedResult = fromJS([
      [
        [{ x: 0, y: 0 }],
        [{ x: 2 / 9, y: 0 }, { x: 1, y: -2 / 9 }, { x: 1, y: 0 }],
        [{ x: 1, y: 2 / 9 }, { x: 0, y: 7 / 9 }, { x: 0, y: 1 }],
        [{ x: 0, y: 11 / 9 }, { x: 7 / 9, y: 1 }, { x: 1, y: 1 }],
      ],
    ]);
    const result = getSolutionPathsData(testState);
    expect(is(result, expectedResult)).to.equal(true);
  });

  it('Should have a selector for getting a detailed matrix.', () => {
    const testState1 = {
      matrix: fromJS({
        cells: [1, 2, 3, 4],
        columnCount: 2,
        rowCount: 2,
      }),
      solutions: fromJS({
        data: [
          [0, 1, 2],
          [0, 2, 1],
        ],
        activeSolution: 0,
        previewSolution: 1,
      }),
    };
    const testState2 = {
      matrix: fromJS({
        cells: [1, 2, 3, 4],
        columnCount: 2,
        rowCount: 2,
      }),
      solutions: fromJS({
        data: [
          [0, 1, 2],
          [0, 2, 1],
        ],
        activeSolution: null,
        previewSolution: null,
      }),
    };
    const expectedResult1 = fromJS({
      cells: [
        { value: 1, activePosition: 0, previewPosition: 0, id: 0 },
        { value: 2, activePosition: 1, previewPosition: 2, id: 1 },
        { value: 3, activePosition: 2, previewPosition: 1, id: 2 },
        { value: 4, activePosition: null, previewPosition: null, id: 3 },
      ],
      columnCount: 2,
      rowCount: 2,
    });
    const expectedResult2 = fromJS({
      cells: [
        { value: 1, activePosition: null, previewPosition: null, id: 0 },
        { value: 2, activePosition: null, previewPosition: null, id: 1 },
        { value: 3, activePosition: null, previewPosition: null, id: 2 },
        { value: 4, activePosition: null, previewPosition: null, id: 3 },
      ],
      columnCount: 2,
      rowCount: 2,
    });
    const result1 = getDetailedMatrix(testState1);
    const result2 = getDetailedMatrix(testState2);

    expect(is(expectedResult1, result1)).to.equal(true);
    expect(is(expectedResult2, result2)).to.equal(true);
  });

  it('Should have a selector for offset matrix cell positions.', () => {
    const testState = {
      matrix: fromJS({
        cells: [1, 2, 3, 4],
        columnCount: 2,
        rowCount: 2,
      }),
      solutions: fromJS({
        data: [
          [0, 1, 2],
        ],
        activeSolution: null,
        previewSolution: null,
      }),
    };
    const expectedResult = fromJS({
      cells: [
        {
          value: 1,
          positions: [
            {
              position: { x: 0, y: 0 },
              solution: 0,
            },
          ],
        },
        {
          value: 2,
          positions: [
            {
              position: { x: 1, y: 0 },
              solution: 0,
            },
          ],
        },
        {
          value: 3,
          positions: [
            {
              position: { x: 0, y: 1 },
              solution: 0,
            },
          ],
        },
        {
          value: 4,
          positions: [],
        },
      ],
      columnCount: 2,
      rowCount: 2,
    });
    const result = getMatrixWithPositionOffsets(testState);

    expect(is(expectedResult, result)).to.equal(true);
  });
});
