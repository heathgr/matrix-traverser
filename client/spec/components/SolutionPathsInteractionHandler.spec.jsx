import React from 'react';
import chai, { expect } from 'chai';
import { List } from 'immutable';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import SolutionPathsInteractionHandler from '../../src/components/SolutionPathsInteractionHandler';

describe('<SolutionPathsInteractionHandler />', () => {
  chai.use(chaiEnzyme());

  const pathsData = List([
    'M25,25 C36.111111111111114,25 75,13.88888888888889 75,25 C75,36.111111111111114 25,63.88888888888889 25,75 C25,86.11111111111111 63.88888888888889,75 75,75',
    'M25,25 C36.111111111111114,25 75,13.88888888888889 75,25 C75,36.111111111111114 25,63.88888888888889 25,75 C25,86.11111111111111 63.88888888888889,75 75,75',
  ]);
  const onSolutionClickedSpy = spy();
  const onSolutionHoverSpy = spy();

  const testWrapper = mount(
    <SolutionPathsInteractionHandler
      width={100}
      height={100}
      solutionPathsData={pathsData}
      onSolutionClicked={onSolutionClickedSpy}
      onSolutionHover={onSolutionHoverSpy}
    />
  );
  const pathsWrapper = testWrapper.find('path');

  it('Should render the correct number of paths', () => {
    expect(pathsWrapper.length).to.equal(2);
  });

  it('Should call onSolutionClicked.', () => {
    pathsWrapper.first().simulate('click');

    expect(onSolutionClickedSpy.calledOnce).to.equal(true);
    expect(onSolutionClickedSpy.calledWith(0)).to.equal(true);
  });

  it('Should call onSolutionHover.', () => {
    pathsWrapper.first().simulate('mouseEnter');
    pathsWrapper.first().simulate('mouseLeave');

    expect(onSolutionHoverSpy.calledTwice).to.equal(true);
    expect(onSolutionHoverSpy.calledWith(0)).to.equal(true);
    expect(onSolutionHoverSpy.calledWith(null)).to.equal(true);
  });
});
