const { expect } = require('chai');
const requestValidator = require('../src/requestValidator');
const { INVALID_MATRIX_LENGTH } = require('../src/constants/errorMessages');

describe('Request Validator', () => {
  it('Should reject a simple matrix object if there is no "cells" property that is an array of integers.', () => {
    expect(requestValidator({ cells: [], columnCount: 9 })).to.equal('"cells" must contain at least 1 items');
    expect(requestValidator({ cells: ['a'], columnCount: 9 })).to.equal('"0" must be a number');
    expect(requestValidator({ cells: new Array(101).fill(8), columnCount: 9 })).to.equal('"cells" must contain less than or equal to 100 items');
    expect(requestValidator({ columnCount: 9 })).to.equal('"cells" is required');
    expect(requestValidator({ cells: [0, 1], columnCount: 2 })).to.equal(null);
  });

  it('Should reject a simple matrix oject if there is no "columnCount" property that is an integer.', () => {
    expect(requestValidator({ cells: [0, 1] })).to.equal('"columnCount" is required');
    expect(requestValidator({ cells: [0, 1], columnCount: 'a' })).to.equal('"columnCount" must be a number');
    expect(requestValidator({ cells: [0, 1], columnCount: 0.8 })).to.equal('"columnCount" must be an integer');
    expect(requestValidator({ cells: [0, 1], columnCount: 0 })).to.equal('"columnCount" must be larger than or equal to 1');
    expect(requestValidator({ cells: [0, 1], columnCount: 1000 })).to.equal('"columnCount" must be less than or equal to 100');
  });

  it('Should reject a matrix object if the length of the matrix is not a multiple of the column count.', () => {
    expect(requestValidator({ cells: [0, 1, 2, 3, 4, 5, 6], columnCount: 3 })).to.equal(INVALID_MATRIX_LENGTH);
  });
});
