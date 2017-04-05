import { expect } from 'chai';
import {
  requestSolutions,
  failedToGetSolutions,
  gotSolutions,
} from '../../src/actions/solutionsActions';
import {
  REQUEST_SOLUTIONS,
  FAILED_TO_GET_SOLUTIONS,
  GOT_SOLUTIONS,
} from '../../src/constants/actionTypes';
import testMatrixSolution from '../testData/testMatrixSolution.json';

describe('Solutions Actions', () => {
  it('Should create a "requestSolutions" action.', () => {
    const matrix = {
      cells: [0, 4, 12, 3],
      columnCount: 2,
    };
    const expectedAction = {
      type: REQUEST_SOLUTIONS,
      matrix,
    };

    expect(requestSolutions(matrix)).to.deep.equal(expectedAction);
  });

  it('Should create a "failedToGetSolutions" action.', () => {
    const error = 'It didn\'t work!!!';
    const expectedAction = {
      type: FAILED_TO_GET_SOLUTIONS,
      error,
    };

    expect(failedToGetSolutions(error)).to.deep.equal(expectedAction);
  });

  it('Should create a "getSolutions" action.', () => {
    const expectedAction = {
      type: GOT_SOLUTIONS,
      solutions: testMatrixSolution,
    };

    expect(gotSolutions(testMatrixSolution)).to.deep.equal(expectedAction);
  });
});
