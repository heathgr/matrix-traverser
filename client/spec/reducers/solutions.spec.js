import { expect } from 'chai';
import { is, fromJS } from 'immutable';
import solutions, {
  getSolutions,
  getActiveSolution,
  getPreviewSolution,
  initialSolutions,
} from '../../src/reducers/solutions';
import {
  gotSolutions,
  failedToGetSolutions,
  setActiveSolution,
  setNextActiveSolution,
  setPreviousActiveSolution,
  setPreviewSolution,
  resetSolutions,
} from '../../src/actions/solutionsActions';

describe('Solutions Reducer', () => {
  const testSolutions = fromJS({
    data: [[4, 5, 8, 10, 4, 6], [4, 5, 8, 10, 3, 6], [4, 5, 8, 10, 6, 6]],
    activeSolution: 0,
    previewSolution: null,
    error: null,
  });

  it('Should correctly handle a GOT_SOLUTIONS action.', () => {
    const testAction = gotSolutions(testSolutions.get('data').toJS());
    const testState = solutions(undefined, testAction);
    const expectedState = testSolutions;

    console.log('TEST STATE: ', testState);
    console.log('EXPECTED STATE: ', expectedState);

    expect(is(expectedState, testState)).to.equal(true);
  });

  it('Should correctly handle a SET_ACTIVE_SOLUTION action.', () => {
    const testAction = setActiveSolution(3);
    const testState = solutions(testSolutions, testAction);
    const expectedState = testSolutions.set('activeSolution', 0);

    expect(is(expectedState, testState)).to.equal(true);
  });

  it('Should correctly handle a SET_NEXT_ACTIVE_SOLUTION action.', () => {
    const testAction = setNextActiveSolution();
    const testState = solutions(testSolutions, testAction);
    const expectedState = testSolutions.set('activeSolution', 1);

    expect(is(expectedState, testState)).to.equal(true);
  });

  it('Should correctly handle a SET_PREVIOUS_ACTIVE_SOLUTION action.', () => {
    const testAction = setPreviousActiveSolution();
    const testState = solutions(testSolutions, testAction);
    const expectedState = testSolutions.set('activeSolution', 2);

    expect(is(expectedState, testState)).to.equal(true);
  });

  it('Should correctly handle a SET_PREVIEW_SOLUTION action', () => {
    const testAction = setPreviewSolution(3);
    const testState = solutions(testSolutions, testAction);
    const expectedState = testSolutions.set('previewSolution', 0);

    expect(is(expectedState, testState)).to.equal(true);
  });

  it('Should correctly handle a RESET_SOLUTIONS action', () => {
    const testAction = resetSolutions();
    const testState = solutions(testSolutions, testAction);
    const expectedState = initialSolutions;

    expect(is(expectedState, testState)).to.equal(true);
  });

  it('Should correctly handle a FAILED_TO_GET_SOLUTIONS action', () => {
    const errorMessage = 'IT\'S BROKEN!!!';
    const testAction = failedToGetSolutions(new Error(errorMessage));
    const testState = solutions(testSolutions, testAction);
    const expectedState = testSolutions.set('error', `Error: ${errorMessage}`);

    expect(is(expectedState, testState)).to.equal(true);
  });

  it('Should have a solutions selector.', () => {
    expect(
      is(getSolutions(testSolutions), testSolutions.get('data'))
    ).to.equal(true);
  });

  it('Should have an active solution selector.', () => {
    expect(
      is(getActiveSolution(testSolutions), 0)
    ).to.equal(true);
  });

  it('Should have a preview solution selector.', () => {
    expect(
      is(getPreviewSolution(testSolutions), null)
    ).to.equal(true);
  });
});
