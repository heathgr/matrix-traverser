import { expect } from 'chai';
import { is, fromJS } from 'immutable';
import solutions, { getSolutions } from '../../src/reducers/solutions';
import { gotSolutions } from '../../src/actions/solutionsActions';

describe('Solutions Reducer', () => {
  const testSolutions = [[4, 5, 8, 10, 4, 6], [4, 5, 8, 10, 3, 6]];
  const testAction = gotSolutions(testSolutions);
  const testState = solutions(undefined, testAction);
  const expectedState = fromJS(testSolutions);

  it('Should correctly handle a GOT_SOLUTIONS action.', () => {
    expect(is(expectedState, testState)).to.equal(true);
  });

  it('Should have a solutions selector.', () => {
    expect(is(getSolutions(testState), expectedState)).to.equal(true);
  });
});
