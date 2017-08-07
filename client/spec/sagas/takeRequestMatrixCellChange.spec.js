import 'babel-polyfill';
import { expect } from 'chai';
import SagaTester from 'redux-saga-tester';
import takeRequestMatrixCellChange from '../../src/sagas/takeRequestMatrixCellChange';
import { requestMatrixCellChange } from '../../src/actions/matrixActions';
import {
  SET_MATRIX_CELL,
  RESET_SOLUTIONS,
  REQUEST_SOLUTIONS,
  TAKING_REQUEST_MATRIX_CELL_CHANGE,
} from '../../src/constants/actionTypes';

describe('Take Request Matrix Cell Change Sage.', () => {
  let sagaTester = null;

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(takeRequestMatrixCellChange);
  });

  it('Should correctly hand a REQUEST_MATRIX_CELL_CHANGE action.', () => {
    sagaTester.dispatch(requestMatrixCellChange(1, 9));

    expect(sagaTester.wasCalled(SET_MATRIX_CELL)).to.equal(true);
    expect(sagaTester.wasCalled(RESET_SOLUTIONS)).to.equal(true);
    expect(sagaTester.wasCalled(REQUEST_SOLUTIONS)).to.equal(true);
  });

  it('Should dispatch a TAKING_REQUEST_MATRIX_CELL_CHANGE action.', () => {
    expect(sagaTester.wasCalled(TAKING_REQUEST_MATRIX_CELL_CHANGE)).to.equal(true);
  });
});
