import 'babel-polyfill';
import { expect } from 'chai';
import { stub } from 'sinon';
import SagaTester from 'redux-saga-tester';
import axios from 'axios';
import { requestSolutions, gotSolutions, failedToGetSolutions } from '../../src/actions/solutionsActions';
import handleRequestSolutions from '../../src/sagas/handleRequestSolutions';
import * as selectors from '../../src/reducers/root';
import { testMatrix } from '../testData/testMatrixData';
import testMatrixSolution from '../testData/testMatrixSolution.json';

describe('Handle Request Solutions Saga', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({
      matrix: testMatrix,
    });
    sagaTester.start(handleRequestSolutions);
  });

  it('Should retrieve a solution from the Matrix Traversal Solver service.', () => {
    stub(selectors, 'getSimpleMatrix', () => testMatrix);
    stub(axios, 'post', () => ({ data: testMatrixSolution }));
    sagaTester.dispatch(requestSolutions());
    expect(sagaTester.getLatestCalledAction()).to.deep.equal(gotSolutions(testMatrixSolution));
    selectors.getSimpleMatrix.restore();
    axios.post.restore();
  });

  it('Should dispatch a failed to get solutions action if there is an error.', () => {
    const testError = new Error('It did not work.');

    stub(selectors, 'getSimpleMatrix', () => testMatrix);
    stub(axios, 'post', () => {
      throw testError;
    });
    sagaTester.dispatch(requestSolutions());
    expect(sagaTester.getLatestCalledAction()).to.deep.equal(failedToGetSolutions(testError));
    selectors.getSimpleMatrix.restore();
    axios.post.restore();
  });
});
