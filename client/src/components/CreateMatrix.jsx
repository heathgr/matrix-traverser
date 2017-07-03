import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import Modal from './Modal';
import Button from './Button';
import Slider from './Slider';

const normalizeInput = (value, lastValue) => {
  const filteredValue = value.replace(/[A-Za-z]/g, '').replace(lastValue, '');
  const evtNumber = parseInt(filteredValue, 10);
  let normalizedNumber = isNaN(evtNumber) ? 0 : evtNumber;

  normalizedNumber = normalizedNumber < 0 ? 0 : normalizedNumber;
  normalizedNumber = normalizedNumber > 6 ? 6 : normalizedNumber;

  return normalizedNumber;
};

class CreateMatrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrixRowCount: 0,
      matrixColumnCount: 0,
    };
  }

  render() {
    const { onToggleCreateMatrixUI, onRequestRandomMatrix } = this.props;

    return (
      <Modal>
        {
          Style.it(
          `
          .row {
            display: flex;
            justify-content: center;
            flex-direction: row;
          }

          .label {
            width: 95px;
            margin: 0 6px;
          }

          .count {
            width: 55px;
            margin: 0 6px;
          }

          input {
            background: none;
            border: none;
            outline: none;
            color: white;
          }
          `,
            <div>
              <div className='row'>Create New Matrix</div>
              <div className='row'>
                <div className='label'>Column Count</div>
                <Slider
                  min={0}
                  max={6}
                  value={this.state.matrixColumnCount}
                  onChange={
                    val => this.setState({
                      ...this.state,
                      matrixColumnCount: val,
                    })
                  }
                />
                <input
                  type='text'
                  className='count'
                  value={this.state.matrixColumnCount === 0 ? 'Random' : this.state.matrixColumnCount}
                  onChange={
                    (evt) => {
                      const input = normalizeInput(evt.target.value, this.state.matrixColumnCount);

                      console.log('c input: ', input);
                      this.setState({
                        ...this.state,
                        matrixColumnCount: input,
                      });
                    }
                  }
                />
              </div>
              <div className='row'>
                <div className='label'>Row Count</div>
                <Slider
                  min={0}
                  max={6}
                  value={this.state.matrixRowCount}
                  onChange={
                    val => this.setState({
                      ...this.state,
                      matrixRowCount: val,
                    })
                  }
                />
                <input
                  type='text'
                  className='count'
                  value={this.state.matrixRowCount === 0 ? 'Random' : this.state.matrixRowCount}
                  onChange={
                    (evt) => {
                      const input = normalizeInput(evt.target.value, this.state.matrixRowCount);

                      console.log('r input: ', input)
                      this.setState({
                        ...this.state,
                        matrixRowCount: input,
                      });
                    }
                  }
                />
              </div>
              <div className='row'>
                <Button
                  onClick={() => {
                    onToggleCreateMatrixUI();
                    onRequestRandomMatrix(
                      this.state.matrixRowCount,
                      this.state.matrixColumnCount
                    );
                  }}
                >Ok</Button>
                <Button onClick={() => { onToggleCreateMatrixUI(); }}>Cancel</Button>
              </div>
            </div>)
        }
      </Modal>
    );
  }
}

CreateMatrix.propTypes = {
  onToggleCreateMatrixUI: PropTypes.func.isRequired,
  onRequestRandomMatrix: PropTypes.func.isRequired,
};

export default CreateMatrix;
