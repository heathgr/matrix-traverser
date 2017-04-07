import { expect } from 'chai';
import { is } from 'immutable';
import { testMatrix, testMatrixWithModifiedCell } from '../testData/testMatrixData';
import matrix, { initialMatrix } from '../../src/reducers/matrix';
import { setMatrix, setMatrixCell } from '../../src/actions/matrixActions';

describe('Matrix Reducer', () => {
  it('Should correctly handle a SET_MATRIX action.', () => {
    const testAction = setMatrix(testMatrix);
    const testState = matrix({}, testAction);
    const expectedState = testMatrix;

    expect(is(testState, expectedState)).to.equal(true);
  });

  it('should correctly handle a SET_MATRIX_CELL action.', () => {
    const testAction = setMatrixCell(1, 1, 72);
    const testState = matrix(testMatrix, testAction);
    const expectedState = testMatrixWithModifiedCell;

    expect(is(testState, expectedState)).to.equal(true);
  });

  it('Should correctly initialize the matrix.', () => {
    const testState = matrix(undefined, { type: 'test' });

    expect(is(testState, initialMatrix)).to.equal(true);
  });
});
