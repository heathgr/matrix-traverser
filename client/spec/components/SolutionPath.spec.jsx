import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import SolutionPath from '../../src/components/SolutionPath';

describe('<SolutionPath />', () => {
  chai.use(chaiEnzyme());

  const performance = {
    now: () => 0,
  };

  const testWrapper = mount(
    <SolutionPath
      pathData={'M0,0 C1,0 C1,1 C0,1'}
      id={2}
      isActive={false}
      isPreview={false}
      width={200}
      height={200}
    />,
    {
      context: {
        performance,
      },
    }
  );

  it('Should render an SVG path with the correct properties.', () => {
    expect(testWrapper).to.have.exactly(1).descendants('svg');
    expect(testWrapper).to.have.exactly(1).descendants('path');
    expect(testWrapper).to.have.prop('pathData');
    expect(testWrapper).to.have.prop('isActive');
    expect(testWrapper).to.have.prop('isPreview');
  });
});
