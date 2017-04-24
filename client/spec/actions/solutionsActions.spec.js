import { expect } from 'chai';
import {
  requestSolutions,
  failedToGetSolutions,
  gotSolutions,
  setActiveSolution,
  setNextActiveSolution,
  setPreviousActiveSolution,
  setPreviewSolution,
} from '../../src/actions/solutionsActions';
import {
  REQUEST_SOLUTIONS,
  FAILED_TO_GET_SOLUTIONS,
  GOT_SOLUTIONS,
  SET_ACTIVE_SOLUTION,
  SET_NEXT_ACTIVE_SOLUTION,
  SET_PREVIOUS_ACTIVE_SOLUTION,
  SET_PREVIEW_SOLUTION,
} from '../../src/constants/actionTypes';
import testMatrixSolution from '../testData/testMatrixSolution.json';

describe('Solutions Actions', () => {
  it('Should create a "requestSolutions" action.', () => {
    const expectedAction = {
      type: REQUEST_SOLUTIONS,
    };

    expect(requestSolutions()).to.deep.equal(expectedAction);
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

  it('Should create a "setActiveSolution" action.', () => {
    const expectedAction = {
      type: SET_ACTIVE_SOLUTION,
      solution: 3,
    };

    expect(setActiveSolution(3)).to.deep.equal(expectedAction);
  });

  it('Should create a "setNextActiveSolution" action.', () => {
    const expectedAction = {
      type: SET_NEXT_ACTIVE_SOLUTION,
    };

    expect(setNextActiveSolution()).to.deep.equal(expectedAction);
  });

  it('Should create a "setPreviousActiveSolution" action.', () => {
    const expectedAction = {
      type: SET_PREVIOUS_ACTIVE_SOLUTION,
    };

    expect(setPreviousActiveSolution()).to.deep.equal(expectedAction);
  });

  it('Should create a "setPreviewSolution" action.', () => {
    const expectedAction = {
      type: SET_PREVIEW_SOLUTION,
      solution: 2,
    };

    expect(setPreviewSolution(2)).to.deep.equal(expectedAction);
  });
});
