import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { Map } from 'immutable';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import MatrixCell from '../../src/components/MatrixCell';
import {
  MATRIX_CELL_INPUT,
  MATRIX_CELL_INPUT_ACTIVE,
  MATRIX_CELL_INPUT_PREVIEW,
  MATRIX_CELL_INPUT_INACTIVE,
  MATRIX_CELL_MAIN_CIRCLE,
  MATRIX_CELL_MAIN_CIRCLE_ACTIVE,
  MATRIX_CELL_MAIN_CIRCLE_INACTIVE,
  MATRIX_CELL_MAIN_CIRCLE_PREVIEW,
  MATRIX_CELL_ACTIVE_CIRCLE,
  MATRIX_CELL_ACTIVE_CIRCLE_VISIBLE,
  MATRIX_CELL_ACTIVE_CIRCLE_HIDDEN,
  MATRIX_CELL_PREVIEW_CIRCLE,
  MATRIX_CELL_PREVIEW_CIRCLE_VISIBLE,
  MATRIX_CELL_PREVIEW_CIRCLE_HIDDEN,
} from '../../src/constants/styleNames';

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
    const mainCircleWrapper = testWrapper.find(`.${MATRIX_CELL_MAIN_CIRCLE}`);
    const activeCircleWrapper = testWrapper.find(`.${MATRIX_CELL_ACTIVE_CIRCLE}`);
    const previewCircleWrapper = testWrapper.find(`.${MATRIX_CELL_PREVIEW_CIRCLE}`);
    const cellInputWrapper = testWrapper.find(`.${MATRIX_CELL_INPUT}`);

    testWrapper.setProps({ cell: testCell.set('activePosition', 8).set('previewPosition', 3) });
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_ACTIVE)).to.equal(true);
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_PREVIEW)).to.equal(false);
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_INACTIVE)).to.equal(false);
    expect(activeCircleWrapper.hasClass(MATRIX_CELL_ACTIVE_CIRCLE_VISIBLE)).to.equal(true);
    expect(activeCircleWrapper.hasClass(MATRIX_CELL_ACTIVE_CIRCLE_HIDDEN)).to.equal(false);
    expect(previewCircleWrapper.hasClass(MATRIX_CELL_PREVIEW_CIRCLE_VISIBLE)).to.equal(true);
    expect(previewCircleWrapper.hasClass(MATRIX_CELL_PREVIEW_CIRCLE_HIDDEN)).to.equal(false);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_ACTIVE)).to.equal(true);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_PREVIEW)).to.equal(false);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_INACTIVE)).to.equal(false);

    testWrapper.setProps({ cell: testCell.set('activePosition', 8).set('previewPosition', null) });
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_ACTIVE)).to.equal(true);
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_PREVIEW)).to.equal(false);
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_INACTIVE)).to.equal(false);
    expect(activeCircleWrapper.hasClass(MATRIX_CELL_ACTIVE_CIRCLE_VISIBLE)).to.equal(true);
    expect(activeCircleWrapper.hasClass(MATRIX_CELL_ACTIVE_CIRCLE_HIDDEN)).to.equal(false);
    expect(previewCircleWrapper.hasClass(MATRIX_CELL_PREVIEW_CIRCLE_VISIBLE)).to.equal(false);
    expect(previewCircleWrapper.hasClass(MATRIX_CELL_PREVIEW_CIRCLE_HIDDEN)).to.equal(true);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_ACTIVE)).to.equal(true);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_PREVIEW)).to.equal(false);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_INACTIVE)).to.equal(false);

    testWrapper.setProps({ cell: testCell.set('activePosition', null).set('previewPosition', 4) });
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_ACTIVE)).to.equal(false);
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_PREVIEW)).to.equal(true);
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_INACTIVE)).to.equal(false);
    expect(activeCircleWrapper.hasClass(MATRIX_CELL_ACTIVE_CIRCLE_VISIBLE)).to.equal(false);
    expect(activeCircleWrapper.hasClass(MATRIX_CELL_ACTIVE_CIRCLE_HIDDEN)).to.equal(true);
    expect(previewCircleWrapper.hasClass(MATRIX_CELL_PREVIEW_CIRCLE_VISIBLE)).to.equal(true);
    expect(previewCircleWrapper.hasClass(MATRIX_CELL_PREVIEW_CIRCLE_HIDDEN)).to.equal(false);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_ACTIVE)).to.equal(false);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_PREVIEW)).to.equal(true);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_INACTIVE)).to.equal(false);

    testWrapper.setProps({ cell: testCell.set('activePosition', null).set('previewPosition', null) });
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_ACTIVE)).to.equal(false);
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_PREVIEW)).to.equal(false);
    expect(mainCircleWrapper.hasClass(MATRIX_CELL_MAIN_CIRCLE_INACTIVE)).to.equal(true);
    expect(activeCircleWrapper.hasClass(MATRIX_CELL_ACTIVE_CIRCLE_VISIBLE)).to.equal(false);
    expect(activeCircleWrapper.hasClass(MATRIX_CELL_ACTIVE_CIRCLE_HIDDEN)).to.equal(true);
    expect(previewCircleWrapper.hasClass(MATRIX_CELL_PREVIEW_CIRCLE_VISIBLE)).to.equal(false);
    expect(previewCircleWrapper.hasClass(MATRIX_CELL_PREVIEW_CIRCLE_HIDDEN)).to.equal(true);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_ACTIVE)).to.equal(false);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_PREVIEW)).to.equal(false);
    expect(cellInputWrapper.hasClass(MATRIX_CELL_INPUT_INACTIVE)).to.equal(true);

    expect(true).to.equal(true);
  });
});
