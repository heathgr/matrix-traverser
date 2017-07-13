import { expect } from 'chai';
import { is, Map } from 'immutable';
import {
  toggleCreateMatrixUI,
  toggleIntroductionUI,
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
      setCreateMatrixColumnCount: 0,
      setCreateMatrixRowCount: 0,
    });

    expect(is(testState, expectedState)).to.equal(true);
  });
  it('Should correctly handle a TOGGLE_INTRODUCTION_UI action.', () => {
    const testAction = toggleIntroductionUI();
    const testState = ui(undefined, testAction);
    const expectedState = Map({
      isCreateMatrixUIVisible: false,
      isIntroductionUIVisible: true,
      setCreateMatrixColumnCount: 0,
      setCreateMatrixRowCount: 0,
    });

    expect(is(testState, expectedState)).to.equal(true);
  });
  it('Should have a getIsCreateMatrixUIVisible selector.', () => {
    const testState = ui(undefined, { type: '@@INIT' });

    expect(getIsCreateMatrixUIVisible(testState)).to.equal(false);
  });
  it('Should have a getIsIntroductionUIVisible.', () => {
    const testState = ui(undefined, { type: '@@INIT' });

    expect(getIsIntroductionUIVisible(testState)).to.equal(false);
  });
});
