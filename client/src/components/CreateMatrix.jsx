import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import Modal from './Modal';
import Button from './Button';
import Slider from './Slider';

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
          `,
            <div>
              <div className='row'>Create New Matrix</div>
              <div className='row'>
                <div className='label'>Column Count</div>
                <Slider
                  min={0}
                  max={6}
                  onChange={
                    val => this.setState({
                      ...this.state,
                      matrixColumnCount: val,
                    })
                  }
                />
                <div className='count'>
                  {this.state.matrixColumnCount === 0 ? 'Random' : this.state.matrixColumnCount}
                </div>
              </div>
              <div className='row'>
                <div className='label'>Row Count</div>
                <Slider
                  min={0}
                  max={6}
                  onChange={
                    val => this.setState({
                      ...this.state,
                      matrixRowCount: val,
                    })
                  }
                />
                <div className='count'>
                  {this.state.matrixRowCount === 0 ? 'Random' : this.state.matrixRowCount}
                </div>
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
