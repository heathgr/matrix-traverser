import { expect } from 'chai';
import testMatrix from '../testData/testMatrix';
import matrix, { initialMatrix } from '../../src/reducers/matrix';
import { setMatrix } from '../../src/actions/matrixActions';

describe('Matrix Reducer', () => {
  it('Should correctly handle a SET_MATRIX action.', () => {
    const testAction = setMatrix(testMatrix);
    const testState = matrix({}, testAction);
    const expectedState = testMatrix;

    expect(testState).to.deep.equal(expectedState);
  });

  it('Should correctly initialize the matrix.', () => {
    const testState = matrix(undefined, { type: 'test' });

    expect(testState).to.deep.equal(initialMatrix);
  })
});
