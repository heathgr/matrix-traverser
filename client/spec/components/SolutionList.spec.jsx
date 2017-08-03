import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { List } from 'immutable';
import React from 'react';

import SolutionList from '../../src/components/SolutionList';

describe('<SolutionList />', () => {
  chai.use(chaiEnzyme());

  const solutionClickedSpy = spy();
  const nextSolutionClickedSpy = spy();
  const prevSolutionClickedSpy = spy();
  const solutionHoverSpy = spy();
  const toggleCreateMatrixUIClickSpy = spy();
  const toggleCreateIntroductionUIClickSpy = spy();

  const testSolution = List([
    List([7, 3, 9, 5]),
    List([7, 3, 9, 6]),
    List([7, 3, 8, 5]),
    List([7, 3, 8, 6]),
  ]);

  const testWrapper = mount(
    <SolutionList
      solutions={testSolution}
      activeSolution={1}
      onSolutionClicked={solutionClickedSpy}
      onNextSolutionClicked={nextSolutionClickedSpy}
      onPreviousSolutionClicked={prevSolutionClickedSpy}
      onSolutionHover={solutionHoverSpy}
      onToggleCreateMatrixUI={toggleCreateMatrixUIClickSpy}
      onToggleIntroductionUI={toggleCreateIntroductionUIClickSpy}
    />
  );

  const buttons = testWrapper.find('button');

  buttons.forEach(
    button => button.simulate('click')
  );

  it('Should display buttons for selecting the next or previous solution.', () => {
    expect(nextSolutionClickedSpy.calledOnce).to.equal(true);
    expect(prevSolutionClickedSpy.calledOnce).to.equal(true);
  });

  it('Should display a series of buttons for selecting a specfic solution.', () => {
    expect(solutionClickedSpy.callCount).to.equal(testSolution.size);
  });

  it('Should have a button for showing the create matrix UI.', () => {
    expect(toggleCreateMatrixUIClickSpy.calledOnce).to.equal(true);
  });

  it('Should have a buttons for showing the introduction UI.', () => {
    expect(toggleCreateIntroductionUIClickSpy.calledOnce).to.equal(true);
  });
});
