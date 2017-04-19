import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import MatrixCell from '../../src/components/MatrixCell';

describe('<MatrixCell />', () => {
  chai.use(chaiEnzyme());

  const testWrapper = mount(<MatrixCell cell={7} cellSize={50} />);

  it('Create a div with the cell value in it.', () => {
    expect(testWrapper).to.have.tagName('div');
    expect(testWrapper).to.have.text(7);
  });
});
