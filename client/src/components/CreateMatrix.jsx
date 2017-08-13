import React from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import Modal from './Modal';
import Button from './Button';
import Slider from './Slider';

const normalizeInput = (evt) => {
  const target = evt.target;
  const valueLength = target.value.length;
  const evtNumber = parseInt(target.value[valueLength - 1], 10);

  if (isNaN(evtNumber)) return 0;
  return Math.min(6, Math.max(0, evtNumber));
};

const selectLastInputCharacter = (evt) => {
  const valueLength = evt.target.value.length;

  evt.target.setSelectionRange(valueLength, valueLength);
};

const CreateMatrix = ({
  onToggleCreateMatrixUI,
  onRequestRandomMatrix,
  onSetCreateMatrixColumnCount,
  onSetCreateMatrixRowCount,
  createMatrixColumnCount,
  createMatrixRowCount,
}) => (
  <Modal>
    {
      Style.it(
      `
      .row {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        font-size: 11px;
      }

      .label {
        width: 95px;
        margin: 0 6px;
      }

      .count {
        width: 55px;
        margin: 0 6px;
      }

      .header {
        font-size: 15px;
        margin: 8px;
      }

      input {
        background: none;
        border: none;
        outline: none;
        color: white;
      }
      `,
        <div>
          <div className='row header'>Create New Matrix</div>
          <div className='row'>
            <div className='label'>Column Count</div>
            <Slider
              min={0}
              max={6}
              value={createMatrixColumnCount}
              onChange={
                val => onSetCreateMatrixColumnCount(val)
              }
            />
            <input
              type='text'
              className='count'
              value={createMatrixColumnCount === 0 ? 'Random' : createMatrixColumnCount}
              onSelect={
                (evt) => {
                  selectLastInputCharacter(evt);
                }
              }
              onChange={
                (evt) => {
                  const input = normalizeInput(evt);

                  onSetCreateMatrixColumnCount(input);
                }
              }
            />
          </div>
          <div className='row'>
            <div className='label'>Row Count</div>
            <Slider
              min={0}
              max={6}
              value={createMatrixRowCount}
              onChange={
                val => onSetCreateMatrixRowCount(val)
              }
            />
            <input
              type='text'
              className='count'
              value={createMatrixRowCount === 0 ? 'Random' : createMatrixRowCount}
              onSelect={
                (evt) => {
                  selectLastInputCharacter(evt);
                }
              }
              onChange={
                (evt) => {
                  const input = normalizeInput(evt);

                  onSetCreateMatrixRowCount(input);
                }
              }
            />
          </div>
          <div className='row'>
            <Button
              onClick={() => {
                onToggleCreateMatrixUI();
                onRequestRandomMatrix(
                  createMatrixRowCount,
                  createMatrixColumnCount,
                );
              }}
            >Ok</Button>
            <Button onClick={() => { onToggleCreateMatrixUI(); }}>Cancel</Button>
          </div>
        </div>)
    }
  </Modal>
);

CreateMatrix.propTypes = {
  onToggleCreateMatrixUI: PropTypes.func.isRequired,
  onRequestRandomMatrix: PropTypes.func.isRequired,
  onSetCreateMatrixColumnCount: PropTypes.func.isRequired,
  onSetCreateMatrixRowCount: PropTypes.func.isRequired,
  createMatrixColumnCount: PropTypes.number.isRequired,
  createMatrixRowCount: PropTypes.number.isRequired,
};

export default CreateMatrix;
