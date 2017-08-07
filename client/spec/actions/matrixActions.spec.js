import { expect } from 'chai';
import { testMatrix } from '../testData/testMatrixData';
import {
  SET_MATRIX,
  SET_MATRIX_CELL,
  REQUEST_RANDOM_MATRIX,
  TAKING_REQUEST_RANDOM_MATRIX,
  REQUEST_MATRIX_CELL_CHANGE,
  TAKING_REQUEST_MATRIX_CELL_CHANGE,
} from '../../src/constants/actionTypes';
import {
  setMatrix,
  setMatrixCell,
  requestRandomMatrix,
  takingRequestRandomMatrix,
  requestMatrixCellChange,
  takingRequestMatrixCellChange,
} from '../../src/actions/matrixActions';

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

  it('Should create a null REQUEST_RANDOM_MATRIX action.', () => {
    const expectedAction = {
      type: REQUEST_RANDOM_MATRIX,
      rowCount: null,
      columnCount: null,
    };
    const testAction = requestRandomMatrix();

    expect(testAction).to.deep.equal(expectedAction);
  });

  it('Should create a TAKING_REQUEST_RANDOM_MATRIX action.', () => {
    const expectedAction = {
      type: TAKING_REQUEST_RANDOM_MATRIX,
    };

    expect(takingRequestRandomMatrix()).to.deep.equal(expectedAction);
  });

  it('Should create a REQUEST_MATRIX_CELL_CHANGE action.', () => {
    const expectedAction = {
      type: REQUEST_MATRIX_CELL_CHANGE,
      index: 1,
      value: 7,
    };

    expect(requestMatrixCellChange(1, 7)).to.deep.equal(expectedAction);
  });

  it('Should create a TAKING_REQUEST_MATRIX_CELL_CHANGE action.', () => {
    const expectedAction = {
      type: TAKING_REQUEST_MATRIX_CELL_CHANGE,
    };

    expect(takingRequestMatrixCellChange()).to.deep.equal(expectedAction);
  });
});
