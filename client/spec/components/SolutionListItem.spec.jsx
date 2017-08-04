import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import SolutionListItem from '../../src/components/SolutionListItem';
import {
  SOLUTION_LIST_ITEM_ACTIVE,
  SOLUTION_LIST_ITEM_INACTIVE,
  SOLUTION_LIST_ITEM_PREVIEW,
} from '../../src/constants/styleNames';

describe('<SolutionListItem />', () => {
  chai.use(chaiEnzyme());

  const onSolutionClickedSpy = spy();
  const onSolutionHoverSpy = spy();

  const testWrapper = mount(<SolutionListItem
    solutionId={1}
    onSolutionClicked={onSolutionClickedSpy}
    onSolutionHover={onSolutionHoverSpy}
    isActive
    isPreview={false}
  />);

  it('Should display the correct solution number.', () => {
    expect(testWrapper).to.include.text('2');
  });

  it('Should call the onClick function.', () => {
    testWrapper.simulate('click');

    expect(onSolutionClickedSpy.calledOnce).to.equal(true);
    expect(onSolutionClickedSpy.calledWith(1)).to.equal(true);
  });

  it('Should call the onSolutionHover function.', () => {
    testWrapper.simulate('mouseEnter');
    testWrapper.simulate('mouseLeave');

    expect(onSolutionHoverSpy.calledTwice).to.equal(true);
    expect(onSolutionHoverSpy.calledWith(1)).to.equal(true);
    expect(onSolutionHoverSpy.calledWith(null)).to.equal(true);
  });

  it('Should style itself correctly based on the isActive and isPreview properties.', () => {
    testWrapper.setProps({ isActive: true, isPreview: true });

    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_ACTIVE)).to.equal(true);
    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_PREVIEW)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_INACTIVE)).to.equal(false);

    testWrapper.setProps({ isActive: true, isPreview: false });

    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_ACTIVE)).to.equal(true);
    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_PREVIEW)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_INACTIVE)).to.equal(false);

    testWrapper.setProps({ isActive: false, isPreview: true });

    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_ACTIVE)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_PREVIEW)).to.equal(true);
    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_INACTIVE)).to.equal(false);

    testWrapper.setProps({ isActive: false, isPreview: false });

    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_ACTIVE)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_PREVIEW)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_LIST_ITEM_INACTIVE)).to.equal(true);
  });
});
