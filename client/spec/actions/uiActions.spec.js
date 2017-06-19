import { expect } from 'chai';
import {
  toggleCreateMatrixUI,
  toggleIntroductionUI,
} from '../../src/actions/uiActions';
import {
  TOGGLE_CREATE_MATRIX_UI,
  TOGGLE_INTRODUCTION_UI,
} from '../../src/constants/actionTypes';

describe('UI Actions', () => {
  it('Should create a "TOGGLE_CREATE_MATRIX_UI" action.', () => {
    const expectedAction = toggleCreateMatrixUI();

    expect(expectedAction).to.deep.equal({
      type: TOGGLE_CREATE_MATRIX_UI,
    });
  });

  it('Should create a "TOGGLE_INTRODUCTION_UI" action.', () => {
    const expectedAction = toggleIntroductionUI();

    expect(expectedAction).to.deep.equal({
      type: TOGGLE_INTRODUCTION_UI,
    });
  });
});
