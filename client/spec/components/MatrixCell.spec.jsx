import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import React from 'react';
import MatrixCell from '../../src/components/MatrixCell';

describe('<MatrixCell />', () => {
  chai.use(chaiEnzyme());

  const testCell = fromJS({
    value: 7,
    activePosition: 1,
    previewPosition: null,
  });

  const testWrapper = mount(<MatrixCell
    cell={testCell}
    cellSize={50}
  />);

  it('Create a div with the cell value in it.', () => {
    expect(testWrapper).to.have.tagName('div');
    expect(testWrapper).to.have.text(7);
  });
});
