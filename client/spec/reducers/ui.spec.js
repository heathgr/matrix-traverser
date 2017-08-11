import { expect } from 'chai';
import { is, Map } from 'immutable';
import {
  toggleCreateMatrixUI,
  toggleIntroductionUI,
  setCreateMatrixColumnCount,
  setCreateMatrixRowCount,
} from '../../src/actions/uiActions';
import ui, {
  getIsCreateMatrixUIVisible,
  getIsIntroductionUIVisible,
} from '../../src/reducers/ui';

describe('UI Reducer', () => {
  it('Should correctly handle a TOGGLE_CREATE_MATRIX_UI action', () => {
    const testAction = toggleCreateMatrixUI();
    const testState = ui(undefined, testAction);
    const expectedState = Map({
      isCreateMatrixUIVisible: true,
      isIntroductionUIVisible: false,
      createMatrixColumnCount: 0,
      createMatrixRowCount: 0,
    });

    expect(is(testState, expectedState)).to.equal(true);
  });
  it('Should correctly handle a TOGGLE_INTRODUCTION_UI action.', () => {
    const testAction = toggleIntroductionUI();
    const testState = ui(undefined, testAction);
    const expectedState = Map({
      isCreateMatrixUIVisible: false,
      isIntroductionUIVisible: true,
      createMatrixColumnCount: 0,
      createMatrixRowCount: 0,
    });

    expect(is(testState, expectedState)).to.equal(true);
  });
  it('Should correctly handle a SET_CREATE_MATRIX_COLUMN_COUNT action.', () => {
    const testAction = setCreateMatrixColumnCount(2);
    const testState = ui(undefined, testAction);
    const expectedState = Map({
      isCreateMatrixUIVisible: false,
      isIntroductionUIVisible: false,
      createMatrixColumnCount: 2,
      createMatrixRowCount: 0,
    });

    expect(is(testState, expectedState)).to.equal(true);
  });
  it('Should correctly handle a SET_CREATE_MATRIX_ROW_COUNT action.', () => {
    const testAction = setCreateMatrixRowCount(7);
    const testState = ui(undefined, testAction);
    const expectedState = Map({
      isCreateMatrixUIVisible: false,
      isIntroductionUIVisible: false,
      createMatrixColumnCount: 0,
      createMatrixRowCount: 7,
    });

    expect(is(testState, expectedState)).to.equal(true);
  });
  it('Should have a getIsCreateMatrixUIVisible selector.', () => {
    const testState = ui(undefined, { type: '@@INIT' });

    expect(getIsCreateMatrixUIVisible(testState)).to.equal(false);
  });
  it('Should have a getIsIntroductionUIVisible selector.', () => {
    const testState = ui(undefined, { type: '@@INIT' });

    expect(getIsIntroductionUIVisible(testState)).to.equal(false);
  });
});
