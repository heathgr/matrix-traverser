const { expect } = require('chai');
const initializePaths = require('../../src/helpers/initializePaths');
const testMatrix = require('../testData/testMatrix');
const testPaths = require('../testData/testPaths');

describe('Initialize Paths', () => {
  it('Should correctly initialize an array of path objects.', () => {
    expect(initializePaths(testMatrix)).to.deep.equal(testPaths);
  });
});
