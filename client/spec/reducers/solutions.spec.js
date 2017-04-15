import { expect } from 'chai';
import { is, List } from 'immutable';
import solutions, { getSolutions } from '../../src/reducers/solutions';
import { gotSolutions } from '../../src/actions/solutionsActions';

describe('Solutions Reducer', () => {
  const testSolutions = List(List([4, 5, 8, 10, 4, 6]), List([4, 5, 8, 10, 3, 6]));
  const testAction = gotSolutions(testSolutions);
  const testState = solutions(undefined, testAction);

  it('Should correctly handle a GOT_SOLUTIONS action.', () => {
    expect(is(testSolutions, testState)).to.equal(true);
  });

  it('Should have a solutions selector.', () => {
    expect(is(getSolutions(testState), testSolutions)).to.equal(true);
  });
});
