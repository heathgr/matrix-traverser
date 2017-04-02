const { expect } = require('chai');
const normalizeMatrix = require('../../src/helpers/normalizeMatrix');
const expectedResult = require('../testData/testMatrix');

describe('Normalize Matrix', () => {
  it('should normalize a provided matrix', () => {
    const result = normalizeMatrix({ cells: [0, 4, 7, 2], columnCount: 2 });

    expect(result).to.deep.equal(expectedResult);
  });
});
