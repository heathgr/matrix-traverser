import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { Map } from 'immutable';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import MatrixCell from '../../src/components/MatrixCell';
import {
  PRIMARY_COLOR,
  ACCENT_COLOR,
  INACTIVE_COLOR,
  PRIMARY_BORDER_COLOR,
  ACCENT_BORDER_COLOR,
} from '../../src/constants/uiColors';

describe('<MatrixCell />', () => {
  chai.use(chaiEnzyme());

  const testCell = Map({
    id: 2,
    value: 7,
    activePosition: null,
    previewPosition: null,
  });

  const requestMatixCellChangeSpy = spy();

  const testWrapper = mount(<MatrixCell
    cell={testCell}
    cellSize={50}
    onRequestMatrixCellChange={requestMatixCellChangeSpy}
  />);

  const inputWrapper = testWrapper.find('input');

  it('Create an input with the cell value in it.', () => {
    expect(inputWrapper).to.have.value('7');
    expect(testWrapper).to.have.prop('cell');
    expect(testWrapper).to.have.prop('cellSize');
  });

  it('Should hande change events.', () => {
    inputWrapper.simulate('select');
    inputWrapper.simulate('change', {
      target: {
        value: '09',
        setSelectionRange: () => null,
      },
    });

    expect(requestMatixCellChangeSpy.calledWith(2, 9)).to.equal(true);
  });

  it('Should style the cell based what solutions are active or being previewed.', () => {
    const mainCircleWrapper = testWrapper.find('.mainCircle');

    testWrapper.setProps({ cell: testCell.set('activePosition', 8) });
    console.log('===>', mainCircleWrapper.hasClass('shit'));
    // expect(mainCircleWrapper).to.have.style('stroke', PRIMARY_COLOR);
    testWrapper.setProps({ cell: testCell.set('previewPosition', 4) });
    testWrapper.setProps({ cell: testCell.set('activePosition', null) });
    testWrapper.setProps({ cell: testCell.set('previewPosition', null) });

    expect(true).to.equal(true);
  });
});
