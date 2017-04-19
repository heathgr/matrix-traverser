import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import SolutionPath from '../../src/components/SolutionPath';

describe('<SolutionPath />', () => {
  chai.use(chaiEnzyme());

  const testWrapper = mount(<SolutionPath pathData={'M0,0 C1,0 C1,1 C0,1'} />);

  it('Should render an SVG path.', () => {
    expect(testWrapper).to.have.exactly(1).descendants('path');
  });
});
