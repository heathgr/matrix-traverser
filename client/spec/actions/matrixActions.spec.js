import { expect } from 'chai';
import { testMatrix } from '../testData/testMatrixData';
import { SET_MATRIX, SET_MATRIX_CELL, REQUEST_RANDOM_MATRIX } from '../../src/constants/actionTypes';
import { setMatrix, setMatrixCell, requestRandomMatrix } from '../../src/actions/matrixActions';

describe('Matrix Actions', () => {
  it('Should create a SET_MATRIX action.', () => {
    const expectedAction = {
      type: SET_MATRIX,
      matrix: testMatrix,
    };
    const testAction = setMatrix(testMatrix);

    expect(testAction).to.deep.equal(expectedAction);
  });

  it('Should create a SET_MATRIX_CELL action.', () => {
    const expectedAction = {
      type: SET_MATRIX_CELL,
      cell: {
        index: 5,
        value: 12,
      },
    };
    const testAction = setMatrixCell(5, 12);

    expect(testAction).to.deep.equal(expectedAction);
  });

  it('Should create a REQUEST_RANDOM_MATRIX action.', () => {
    const expectedAction = {
      type: REQUEST_RANDOM_MATRIX,
      rowCount: 4,
      columnCount: 7,
    };
    const testAction = requestRandomMatrix(4, 7);

    expect(testAction).to.deep.equal(expectedAction);
  });

  it('Should create a null REQUEST_RANDOM_MATRIX action', () => {
    const expectedAction = {
      type: REQUEST_RANDOM_MATRIX,
      rowCount: null,
      columnCount: null,
    };
    const testAction = requestRandomMatrix();

    expect(testAction).to.deep.equal(expectedAction);
  });
});
