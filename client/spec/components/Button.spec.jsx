import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import Button from '../../src/components/Button';

describe('<Button />', () => {
  chai.use(chaiEnzyme());

  const onClickSpy = spy();
  const TestChild = () => <div>test child</div>;
  const testWrapper = mount(
    <Button
      onClick={onClickSpy}
    >
      <TestChild />
    </Button>
  );

  it('Should be a wrapper for a button.', () => expect(testWrapper.find('button')).to.exist);

  it('Should call the onClick callback.', () => {
    testWrapper.simulate('click');

    expect(onClickSpy.calledOnce).to.equal(true);
  });

  it('Should correctly render children.', () => expect(testWrapper.find(TestChild)).to.exist);
});
