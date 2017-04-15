import { expect } from 'chai';
import { is } from 'immutable';
import root, { getMatrix, getSolutions } from '../../src/reducers/root';
import { initialMatrix } from '../../src/reducers/matrix';
import { initialSolutions } from '../../src/reducers/solutions';

describe('Root Reducer', () => {
  const state = root(undefined, { type: 'TEST' });
  const expectedState = {
    matrix: initialMatrix,
    solutions: initialSolutions,
  };

  it('Should compose the matrix and solutions reducers.', () => {
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
      is(getSolutions(state), initialSolutions)
    ).to.equal(true);
  });
});
