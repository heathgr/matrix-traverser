import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import React from 'react';
import SolutionPath from '../../src/components/SolutionPath';

describe('<SolutionPath />', () => {
  chai.use(chaiEnzyme());
  const clickedSpy = spy();
  const hoverSpy = spy();
  const testWrapper = mount(
    <SolutionPath
      pathData={'M0,0 C1,0 C1,1 C0,1'}
      id={2}
      isActive={false}
      onSolutionClicked={clickedSpy}
      onSolutionHover={hoverSpy}
    />
  );

  it('Should render an SVG path with the correct properties.', () => {
    expect(testWrapper).to.have.exactly(1).descendants('path');
    expect(testWrapper).to.have.prop('pathData');
    expect(testWrapper).to.have.prop('isActive');
    expect(testWrapper).to.have.prop('onSolutionClicked');
  });

  it('Should call the onSolutionClicked function with the components id property when clicked.', () => {
    testWrapper.simulate('click');
    expect(clickedSpy.calledOnce).to.equal(true);
    expect(clickedSpy.calledWith(2)).to.equal(true);
  });
});
