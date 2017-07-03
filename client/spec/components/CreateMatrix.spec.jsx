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
  const testWrapper = mount(
    <CreateMatrix
      onToggleCreateMatrixUI={onToggleCreateMatrixUISpy}
      onRequestRandomMatrix={onRequestRandomMatrixSpy}
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
    expect(testWrapper.state()).to.deep.equal({
      matrixRowCount: 4,
      matrixColumnCount: 4,
    });
  });

  it('Should dispatch an onToggleCreateMatrixUI action when clicked the ok or cancel buttons are clicked.', () => {
    expect(onToggleCreateMatrixUISpy.callCount).to.equal(2);
  });

  it('Should dispatch an onRequestRandomMatrix action when the cancel button is clicked.', () => {
    expect(onRequestRandomMatrixSpy.calledOnce).to.equal(true);
  });

  it('Should have input fields for column and row counts.', () => {
    inputs.forEach(
      input => input.simulate('change', { target: { value: '0' } })
    );
    expect(testWrapper.state()).to.deep.equal({
      matrixRowCount: 0,
      matrixColumnCount: 0,
    });
    inputs.forEach(
      input => input.simulate('change', { target: { value: '3' } })
    );
    expect(testWrapper.state()).to.deep.equal({
      matrixRowCount: 3,
      matrixColumnCount: 3,
    });
    inputs.forEach(
      input => input.simulate('change', { target: { value: '-3' } })
    );
    expect(testWrapper.state()).to.deep.equal({
      matrixRowCount: 0,
      matrixColumnCount: 0,
    });
    inputs.forEach(
      input => input.simulate('change', { target: { value: '9' } })
    );
    expect(testWrapper.state()).to.deep.equal({
      matrixRowCount: 6,
      matrixColumnCount: 6,
    });
    inputs.forEach(
      input => input.simulate('change', { target: { value: 'f' } })
    );
    expect(testWrapper.state()).to.deep.equal({
      matrixRowCount: 0,
      matrixColumnCount: 0,
    });
  });
});
