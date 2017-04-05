import { expect } from 'chai';
import testMatrix from '../testData/testMatrix';
import { SET_MATRIX } from '../../src/constants/actionTypes';
import { setMatrix } from '../../src/actions/matrixActions';

describe('Matrix Actions', () => {
  it('Should create a "setMatrix" action.', () => {
    const expectedAction = {
      type: SET_MATRIX,
      matrix: testMatrix,
    };
    const testAction = setMatrix(testMatrix);

    expect(testAction).to.deep.equal(expectedAction);
  });
});
