import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import ReactSlider from 'react-slider';
import Slider from '../../src/components/Slider';

describe('<Slider />', () => {
  chai.use(chaiEnzyme());

  const onChangeSpy = spy();
  const testWrapper = mount(
    <Slider
      min={1}
      max={5}
      onChange={onChangeSpy}
      value={3}
    />
  );
  const reactSliderWrapper = testWrapper.find(ReactSlider);

  it('Should act as a wrapper for <ReactSlider />', () => expect(reactSliderWrapper).to.exist);

  it('Should pass the onChange function to <ReactSlider />.', () => {
    reactSliderWrapper.props().onChange();

    expect(onChangeSpy.calledOnce).to.equal(true);
  });

  it('Should pass the min, max, and value props to <ReactSlider />', () => {
    expect(reactSliderWrapper.props().min).to.equal(1);
    expect(reactSliderWrapper.props().max).to.equal(5);
    expect(reactSliderWrapper.props().value).to.equal(3);
  });
});
