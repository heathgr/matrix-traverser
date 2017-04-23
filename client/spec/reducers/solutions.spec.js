import { expect } from 'chai';
import { is, fromJS } from 'immutable';
import solutions, {getSolutions, getActiveSolution } from '../../src/reducers/solutions';
import {
  gotSolutions,
  setActiveSolution,
  setNextActiveSolution,
  setPreviousActiveSolution,
} from '../../src/actions/solutionsActions';

describe('Solutions Reducer', () => {
  const testSolutions = fromJS({
    data: [[4, 5, 8, 10, 4, 6], [4, 5, 8, 10, 3, 6], [4, 5, 8, 10, 6, 6]],
    activeSolution: 0,
    previewSolution: null,
  });

  it('Should correctly handle a GOT_SOLUTIONS action.', () => {
    const testAction = gotSolutions(testSolutions.get('data').toJS());
    const testState = solutions(undefined, testAction);
    const expectedState = testSolutions;

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
});
