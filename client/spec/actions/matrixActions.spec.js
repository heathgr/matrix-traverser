import { expect } from 'chai';
import { testMatrix } from '../testData/testMatrixData';
import { SET_MATRIX, SET_MATRIX_CELL } from '../../src/constants/actionTypes';
import { setMatrix, setMatrixCell } from '../../src/actions/matrixActions';

describe('Matrix Actions', () => {
  it('Should create a "setMatrix" action.', () => {
    const expectedAction = {
      type: SET_MATRIX,
      matrix: testMatrix,
    };
    const testAction = setMatrix(testMatrix);

    expect(testAction).to.deep.equal(expectedAction);
  });

  it('Should create a "setMatrixCell action.', () => {
    const expectedAction = {
      type: SET_MATRIX_CELL,
      cell: {
        row: 0,
        column: 3,
        value: 12,
      },
    };
    const testAction = setMatrixCell(0, 3, 12);

    expect(testAction).to.deep.equal(expectedAction);
  });
});
