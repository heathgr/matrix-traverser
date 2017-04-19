import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import Matrix from '../../src/components/Matrix';
import MatrixCell from '../../src/components/MatrixCell';

describe('<Matrix />', () => {
  chai.use(chaiEnzyme());

  const testMatrix = fromJS({
    cells: [1, 2, 3, 4],
    columnCount: 2,
    rowCount: 2,
  });

  const testWrapper = mount(<Matrix matrix={testMatrix} width={100} height={100} cellSize={50} />);

  it('Should render the correct number of <MatrixCell /> componenst.', () => {
    expect(testWrapper).to.have.exactly(4).descendants(MatrixCell);
  });
});
