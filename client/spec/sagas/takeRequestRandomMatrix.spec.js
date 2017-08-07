import 'babel-polyfill';
import { expect } from 'chai';
import SagaTester from 'redux-saga-tester';
import matrix from '../../src/reducers/matrix';
import takeRequestRandomMatrix from '../../src/sagas/takeRequestRandomMatrix';
import { requestRandomMatrix } from '../../src/actions/matrixActions';
import {
  SET_MATRIX,
  RESET_SOLUTIONS,
  REQUEST_SOLUTIONS,
  TAKING_REQUEST_RANDOM_MATRIX,
} from '../../src/constants/actionTypes';

describe('Take Request Random Matrix Saga.', () => {
  let sagaTester = null;
  const testState = matrix(undefined, { type: 'init' });

  beforeEach(() => {
    sagaTester = new SagaTester(testState);
    sagaTester.start(takeRequestRandomMatrix);
  });

  it('Should correctly handle a REQUEST_RANDOM_MATRIX action.', () => {
    sagaTester.dispatch(requestRandomMatrix());

    expect(sagaTester.wasCalled(SET_MATRIX)).to.equal(true);
    expect(sagaTester.wasCalled(RESET_SOLUTIONS)).to.equal(true);
    expect(sagaTester.wasCalled(REQUEST_SOLUTIONS)).to.equal(true);
  });

  it('Should dispatch a TAKING_RANDOM_MATRIX action.', () => {
    expect(sagaTester.wasCalled(TAKING_REQUEST_RANDOM_MATRIX)).to.equal(true);
  });
});
