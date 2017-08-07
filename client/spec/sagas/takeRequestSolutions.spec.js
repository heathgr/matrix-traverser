import 'babel-polyfill';
import { expect } from 'chai';
import { stub } from 'sinon';
import SagaTester from 'redux-saga-tester';
import axios from 'axios';
import {
  requestSolutions,
  gotSolutions,
  failedToGetSolutions,
  takingRequestSolutions,
} from '../../src/actions/solutionsActions';
import { TAKING_REQUEST_SOLUTIONS } from  '../../src/constants/actionTypes';
import takeRequestSolutions from '../../src/sagas/takeRequestSolutions';
import * as selectors from '../../src/reducers/root';
import { testMatrix } from '../testData/testMatrixData';
import testMatrixSolution from '../testData/testMatrixSolution.json';

describe('Take Request Solutions Saga', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({
      matrix: testMatrix,
    });
    sagaTester.start(takeRequestSolutions);
  });

  it('Should retrieve a solution from the Matrix Traversal Solver service.', () => {
    stub(selectors, 'getMatrix', () => testMatrix);
    stub(axios, 'post', () => ({ data: testMatrixSolution }));
    sagaTester.dispatch(requestSolutions());
    expect(sagaTester.getLatestCalledAction()).to.deep.equal(gotSolutions(testMatrixSolution));
    selectors.getMatrix.restore();
    axios.post.restore();
  });

  it('Should dispatch a failed to get solutions action if there is an error.', () => {
    const testError = new Error('It did not work.');

    stub(selectors, 'getMatrix', () => testMatrix);
    stub(axios, 'post', () => {
      throw testError;
    });
    sagaTester.dispatch(requestSolutions());
    expect(sagaTester.getLatestCalledAction()).to.deep.equal(failedToGetSolutions(testError));
    selectors.getMatrix.restore();
    axios.post.restore();
  });

  it('Should dispatch a TAKING_REQUEST_SOLUTIONS', () => {
    expect(sagaTester.wasCalled(TAKING_REQUEST_SOLUTIONS)).to.equal(true);
  });
});
