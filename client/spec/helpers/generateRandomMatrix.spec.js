import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import generateRandomMatrix from '../../src/helpers/generateRandomMatrix';

describe('Generate Random Matrix Helper.', () => {
  chai.use(chaiImmutable);

  it('Should generate a random matrix.', () => {
    const result = generateRandomMatrix();
    const resultCells = result.get('cells');

    expect(result).to.have.keys('rowCount', 'columnCount', 'cells');
    expect(result.get('cells')).to.have.sizeOf(result.get('columnCount') * result.get('rowCount'));
  });

  it('Should generate a random matrix with a specific number of rows and columns.', () => {
    const result = generateRandomMatrix(3, 7);

    expect(result.get('rowCount')).to.equal(3);
    expect(result.get('columnCount')).to.equal(7);
    expect(result.get('cells')).to.have.sizeOf(result.get('columnCount') * result.get('rowCount'));
  });
});
