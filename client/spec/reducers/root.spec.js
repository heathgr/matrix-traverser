import { expect } from 'chai';
import { is, fromJS } from 'immutable';
import root, {
  getActiveSolution,
  getMatrix,
  getSolutions,
  getSolutionPathsData,
} from '../../src/reducers/root';
import { initialMatrix } from '../../src/reducers/matrix';
import { initialSolutions } from '../../src/reducers/solutions';
import { initialUIState } from '../../src/reducers/ui';

describe('Root Reducer', () => {
  const state = root(undefined, { type: 'TEST' });
  const expectedState = {
    matrix: initialMatrix,
    solutions: initialSolutions,
    ui: initialUIState,
  };

  it('Should compose the matrix, solutions, and UI reducers.', () => {
    Object.keys(state).forEach(
      key => expect(is(state[key], expectedState[key])).to.equal(true)
    );
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
});
