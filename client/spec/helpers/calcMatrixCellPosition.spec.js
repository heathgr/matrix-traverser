import { expect } from 'chai';
import { is, Map } from 'immutable';
import calcMatrixPosition from '../../src/helpers/calcMatrixCellPosition';

describe('Calculate Matrix Cell Position Helper.', () => {
  it('Should correctly calculate the position of a cell in the matrix.', () => {
    const testColumnCount = 3;
    const test1 = calcMatrixPosition(2, testColumnCount);
    const test2 = calcMatrixPosition(4, testColumnCount);

    expect(is(test1, Map({ x: 2, y: 0 }))).to.equal(true);
    expect(is(test2, Map({ x: 1, y: 1 }))).to.equal(true);
  });
});
