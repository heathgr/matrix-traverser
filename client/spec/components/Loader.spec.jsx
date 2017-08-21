import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import Loader from '../../src/components/Loader';

describe('<Loader />', () => {

  chai.use(chaiEnzyme);

  const testWrapper = mount(<Loader />);

  it('Should be an SVG with three circles.', () => {
    expect(testWrapper).to.have.exactly(1).descendants('svg');
    expect(testWrapper).to.have.exactly(3).descendants('circle');
  });
});
