const { expect } = require('chai');
const getCellNeighbors = require('../../src/helpers/getCellNeighbors');
const matrix = require('../testData/testMatrix');

describe('Get Cell Neighbors', () => {
  it('Should successfully find a matrix cell\'s neighbors', () => {
    expect(getCellNeighbors(0, matrix)).to.have.all.members([1, 2, 3]);
  });
});
