import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Style from 'style-it';
import PureImmutable from '../helpers/hocs/PureImmutable';
import {
  MATRIX_CELL_WRAPPER,
  MATRIX_CELL_SVG_WRAPPER,
  MATRIX_CELL_SVG,
  MATRIX_CELL_INPUT_WRAPPER,
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
} from '../constants/styleNames';

class MatrixCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTransitioningActive: false,
      transitionTimeout: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeSolution !== this.props.activeSolution) {
      clearTimeout(this.state.transitionTimeout);
      const newTransitionTimeout = setTimeout(
        () => {
          this.setState({
            ...this.state,
            isTransitioningActive: false,
          });
        },
        500
      );
      this.setState({
        ...this.state,
        isTransitioningActive: true,
        transitionTimeout: newTransitionTimeout,
      });
    }
  }

  render() {
    const {
      cell,
      cellSize,
      onRequestMatrixCellChange,
    } = this.props;
    const {
      isTransitioningActive,
      isTransitioningPreview,
    } = this.state;
    const activePosition = cell.get('activePosition');
    const previewPosition = cell.get('previewPosition');
    const halfCellSize = cellSize * 0.5;
    const circleStyle = (() => {
      if (activePosition !== null) {
        return `${MATRIX_CELL_MAIN_CIRCLE} ${MATRIX_CELL_MAIN_CIRCLE_ACTIVE}`;
      } else if (previewPosition !== null) {
        return `${MATRIX_CELL_MAIN_CIRCLE} ${MATRIX_CELL_MAIN_CIRCLE_PREVIEW}`;
      }
      return `${MATRIX_CELL_MAIN_CIRCLE} ${MATRIX_CELL_MAIN_CIRCLE_INACTIVE}`;
    })();
    const activeCircleStyle = (() => {
      if (activePosition !== null && !isTransitioningActive) {
        return `${MATRIX_CELL_ACTIVE_CIRCLE} ${MATRIX_CELL_ACTIVE_CIRCLE_VISIBLE} activeAnimationOffset`;
      }
      return `${MATRIX_CELL_ACTIVE_CIRCLE} ${MATRIX_CELL_ACTIVE_CIRCLE_HIDDEN}`;
    })();
    const previewCircleStyle = (() => {
      if (previewPosition !== null && !isTransitioningPreview) {
        return `${MATRIX_CELL_PREVIEW_CIRCLE} ${MATRIX_CELL_PREVIEW_CIRCLE_VISIBLE} previewAnimationOffset`;
      }
      return `${MATRIX_CELL_PREVIEW_CIRCLE} ${MATRIX_CELL_PREVIEW_CIRCLE_HIDDEN}`;
    })();
    const inputStyle = (() => {
      if (activePosition !== null) {
        return `${MATRIX_CELL_INPUT} ${MATRIX_CELL_INPUT_ACTIVE}`;
      } else if (previewPosition !== null) {
        return `${MATRIX_CELL_INPUT} ${MATRIX_CELL_INPUT_PREVIEW}`;
      }
      return `${MATRIX_CELL_INPUT} ${MATRIX_CELL_INPUT_INACTIVE}`;
    })();

    return Style.it(`
      .activeAnimationOffset {
        transition: stroke-dasharray ease 0.5s ${activePosition * 0.2}s;
      }

      .previewAnimationOffset {
        transition: stroke-dasharray ease 0.5s ${previewPosition * 0.2}s;
      }
    `, (
      <div className={MATRIX_CELL_WRAPPER}>
        <div className={MATRIX_CELL_INPUT_WRAPPER}>
          <input
            type='text'
            className={inputStyle}
            value={cell.get('value')}
            onSelect={
              (evt) => {
                const valueLength = evt.target.value.length;

                evt.target.setSelectionRange(valueLength, valueLength);
              }
            }
            onChange={
              (evt) => {
                const target = evt.target;
                const valueLength = target.value.length;
                const evtNumber = parseInt(target.value[valueLength - 1], 10);

                if (!isNaN(evtNumber)) {
                  const newCellVal = Math.min(9, Math.max(0, evtNumber));

                  target.value = newCellVal;
                  target.setSelectionRange(1, 1);
                  onRequestMatrixCellChange(cell.get('id'), newCellVal);
                }
              }
            }
          />
        </div>
        <div className={MATRIX_CELL_SVG_WRAPPER}>
          <svg className={MATRIX_CELL_SVG}>
            <circle
              className={circleStyle}
              cx={halfCellSize}
              cy={halfCellSize}
              r={cellSize * 0.1}
            />
            <circle
              className={activeCircleStyle}
              cx={halfCellSize}
              cy={halfCellSize}
              r={cellSize * 0.2}
            />
            <circle
              className={previewCircleStyle}
              cx={halfCellSize}
              cy={halfCellSize}
              r={cellSize * 0.175}
            />
          </svg>
        </div>
      </div>
    ));
  }
}

MatrixCell.defaultProps = {
  activeSolution: null,
};

MatrixCell.propTypes = {
  cell: ImmutablePropTypes.mapContains({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    activePosition: PropTypes.number,
    previewPosition: PropTypes.number,
  }).isRequired,
  cellSize: PropTypes.number.isRequired,
  onRequestMatrixCellChange: PropTypes.func.isRequired,
  activeSolution: PropTypes.number.isRequired,
};

export default PureImmutable()(MatrixCell);
