import { expect } from 'chai';

import {
  requestMatrixSolution,
  failedToGetMatrixSolution,
  gotMatrixSolution,
} from '../../src/actions/matrixSolutionActions';

import {
  REQUEST_MATRIX_SOLUTION,
  FAILED_TO_GET_MATRIX_SOLUTION,
  GOT_MATRIX_SOLUTION,
} from '../../src/constants/actionTypes';

import testMatrixSolution from '../testData/testMatrixSolution.json';

describe('Matrix Solution Actions', () => {
  it('Should create a "requestMatrixSolutionAction".', () => {
    const matrix = {
      cells: [0, 4, 12, 3],
      columnCount: 2,
    };
    const expectedAction = {
      type: REQUEST_MATRIX_SOLUTION,
      matrix,
    };

    expect(requestMatrixSolution(matrix)).to.deep.equal(expectedAction);
  });

  it('Should create a "failedToGetMatrixSolution".', () => {
    const error = 'It didn\'t work!!!';
    const expectedAction = {
      type: FAILED_TO_GET_MATRIX_SOLUTION,
      error,
    };

    expect(failedToGetMatrixSolution(error)).to.deep.equal(expectedAction);
  });

  it('Should create a "getMatrixSolution".', () => {
    const expectedAction = {
      type: GOT_MATRIX_SOLUTION,
      solution: testMatrixSolution,
    };

    expect(gotMatrixSolution(testMatrixSolution)).to.deep.equal(expectedAction);
  });
});
