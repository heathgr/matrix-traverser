import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import generateRandomMatrix from '../../src/helpers/generateRandomMatrix';

describe('Generate Random Matrix Helper.', () => {
  chai.use(chaiImmutable);

  it('Should generate a random matrix.', () => {
    const result = generateRandomMatrix();
    const resultCells = result.get && result.get('cells');

    expect(result).to.have.keys('rowCount', 'columnCount', 'cells');
    expect(resultCells).to.have.sizeOf(result.get('columnCount') * result.get('rowCount'));
  });
});
