import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { List } from 'immutable';
import React from 'react';

import SolutionList from '../../src/components/SolutionsList';

describe('<SolutionList />', () => {
  chai.use(chaiEnzyme());

  const solutionClickedSpy = spy();
  const nextSolutionClickedSpy = spy();
  const prevSolutionClickedSpy = spy();
  const solutionHoverSpy = spy();

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
    />
  );

  it('Should display text indicating the number of solutions and current active solution.', () => {
    expect(testWrapper).to.contain.text('Viewing solution 2 of 4');
  });

  it('Should display buttons for selecting the next or previous solution.', () => {
    const buttons = testWrapper.find('button');

    buttons.forEach(
      button => button.simulate('click')
    );

    expect(nextSolutionClickedSpy.calledOnce).to.equal(true);
    expect(prevSolutionClickedSpy.calledOnce).to.equal(true);
  });

  it('Should display a series of buttons for selecting a specfic solution.', () => {
    
  });
});
