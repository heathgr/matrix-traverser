import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import Introduction from '../../src/components/Introduction';

describe('<Introduction />', () => {
  chai.use(chaiEnzyme());

  const onToggleIntroductionUISpy = spy();
  const testWrapper = mount(
    <Introduction onToggleIntroductionUI={onToggleIntroductionUISpy} />
  );

  it('Should have a button the calls the onToggleIntroductionUI function when clicked.', () => {
    testWrapper.find('button').simulate('click');

    expect(onToggleIntroductionUISpy.calledOnce).to.equal(true);
  });
});
