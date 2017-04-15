import { expect } from 'chai';
import calcMatrixPosition from '../../src/helpers/calcMatrixCellPosition';

describe('Calculate Matrix Cell Position Helper.', () => {
  it('Should correctly calculate the position of a cell in the matrix.', () => {
    // testCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const testColumnCount = 3;
    const test1 = calcMatrixPosition(2, testColumnCount);
    const test2 = calcMatrixPosition(4, testColumnCount);

    expect(test1).to.deep.equal({ x: 2, y: 0 });
    expect(test2).to.deep.equal({ x: 1, y: 1 });
  });
});
