const { expect } = require('chai');
const iteratePath = require('../../src/helpers/iteratePath');
const matrix = require('../testData/testMatrix');
const paths = require('../testData/testPaths');
const iteratedPath = require('../testData/iteratedTestPath');

describe('Iterate Path', () => {
  it('Should correctly iterate a path.', () => {
    expect(iteratePath(paths[0], matrix)).to.deep.equal(iteratedPath);
  });
});
