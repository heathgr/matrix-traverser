import 'babel-polyfill';
import { expect } from 'chai';
import SagaTester from 'redux-saga-tester';
import start from '../../src/sagas/start';
import {
  TAKING_REQUEST_MATRIX_CELL_CHANGE,
  TAKING_REQUEST_RANDOM_MATRIX,
  TAKING_REQUEST_SOLUTIONS,
  REQUEST_RANDOM_MATRIX,
} from '../../src/constants/actionTypes';

describe('Start Saga', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(start);
  });

  it('Should fork all other sagas and request a random matrix.', () => {
    expect(sagaTester.wasCalled(TAKING_REQUEST_MATRIX_CELL_CHANGE)).to.equal(true);
    expect(sagaTester.wasCalled(TAKING_REQUEST_RANDOM_MATRIX)).to.equal(true);
    expect(sagaTester.wasCalled(TAKING_REQUEST_SOLUTIONS)).to.equal(true);
    expect(sagaTester.wasCalled(REQUEST_RANDOM_MATRIX)).to.equal(true);
  });
});
