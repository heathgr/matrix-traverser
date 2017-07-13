import { expect } from 'chai';
import {
  toggleCreateMatrixUI,
  toggleIntroductionUI,
  setCreateMatrixColumnCount,
  setCreateMatrixRowCount,
} from '../../src/actions/uiActions';
import {
  TOGGLE_CREATE_MATRIX_UI,
  TOGGLE_INTRODUCTION_UI,
  SET_CREATE_MATRIX_COLUMN_COUNT,
  SET_CREATE_MATRIX_ROW_COUNT,
} from '../../src/constants/actionTypes';

describe('UI Actions', () => {
  it('Should create a "TOGGLE_CREATE_MATRIX_UI" action.', () => {
    const testAction = toggleCreateMatrixUI();

    expect(testAction).to.deep.equal({
      type: TOGGLE_CREATE_MATRIX_UI,
    });
  });

  it('Should create a "TOGGLE_INTRODUCTION_UI" action.', () => {
    const testAction = toggleIntroductionUI();

    expect(testAction).to.deep.equal({
      type: TOGGLE_INTRODUCTION_UI,
    });
  });

  it('Should create a "SET_CREATE_MATRIX_COLUMN" action.', () => {
    const testAction = setCreateMatrixColumnCount(3);

    expect(testAction).to.deep.equal({
      type: SET_CREATE_MATRIX_COLUMN_COUNT,
      count: 3,
    });
  });

  it('Should create a "SET_CREATE_MATRIX_ROW_COUNT" action.', () => {
    const testAction = setCreateMatrixRowCount(7);

    expect(testAction).to.deep.equal({
      type: SET_CREATE_MATRIX_ROW_COUNT,
      count: 7,
    });
  });
});
