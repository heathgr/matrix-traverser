import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import React from 'react';

import CreateMatrix from '../../src/components/CreateMatrix';
import Slider from '../../src/components/Slider';

describe('<CreateMatrix />', () => {
  chai.use(chaiEnzyme());

  const onToggleCreateMatrixUISpy = spy();
  const onRequestRandomMatrixSpy = spy();
  const onSetCreateMatrixColumnCountSpy = spy();
  const onSetCreateMatrixRowCountSpy = spy();
  const testWrapper = mount(
    <CreateMatrix
      onToggleCreateMatrixUI={onToggleCreateMatrixUISpy}
      onRequestRandomMatrix={onRequestRandomMatrixSpy}
      onSetCreateMatrixColumnCount={onSetCreateMatrixColumnCountSpy}
      onSetCreateMatrixRowCount={onSetCreateMatrixRowCountSpy}
      createMatrixColumnCount={1}
      createMatrixRowCount={1}
    />
  );

  const buttons = testWrapper.find('button');
  const sliders = testWrapper.find(Slider);
  const inputs = testWrapper.find('input');

  buttons.forEach(
    button => button.simulate('click')
  );
  sliders.forEach(
    slider => slider.prop('onChange')(4)
  );

  it('Should have a column count slider and row count slider.', () => {
    expect(sliders.length).to.equal(2);
  });

  it('Should dispatch an onToggleCreateMatrixUI action when clicked the ok or cancel buttons are clicked.', () => {
    expect(onToggleCreateMatrixUISpy.callCount).to.equal(2);
  });

  it('Should dispatch an onRequestRandomMatrix action when the cancel button is clicked.', () => {
    expect(onRequestRandomMatrixSpy.calledOnce).to.equal(true);
  });

  it('Should have input fields for column and row counts.', () => {
    inputs.forEach(
      input => input.simulate('change', { target: { value: '00' } })
    );
    expect(onSetCreateMatrixColumnCountSpy.calledWith(0)).to.equal(true);
    expect(onSetCreateMatrixRowCountSpy.calledWith(0)).to.equal(true);
    inputs.forEach(
      input => input.simulate('change', { target: { value: '03' } })
    );
    expect(onSetCreateMatrixColumnCountSpy.calledWith(3)).to.equal(true);
    expect(onSetCreateMatrixRowCountSpy.calledWith(3)).to.equal(true);
    inputs.forEach(
      input => input.simulate('change', { target: { value: '09' } })
    );
    expect(onSetCreateMatrixColumnCountSpy.calledWith(6)).to.equal(true);
    expect(onSetCreateMatrixRowCountSpy.calledWith(6)).to.equal(true);
    inputs.forEach(
      input => input.simulate('change', { target: { value: '0f' } })
    );
    expect(onSetCreateMatrixColumnCountSpy.calledWith(0)).to.equal(true);
    expect(onSetCreateMatrixRowCountSpy.calledWith(0)).to.equal(true);
  });
});
