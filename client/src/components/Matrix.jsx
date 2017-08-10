import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Style from 'style-it';
import PureImmutable from '../helpers/hocs/PureImmutable';
import MatrixCell from './MatrixCell';
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
import {
  PRIMARY_COLOR,
  ACCENT_COLOR,
  PRIMARY_BORDER_COLOR,
  ACCENT_BORDER_COLOR,
  INACTIVE_COLOR,
  BACKGROUND_COLOR,
} from '../constants/uiColors';

const Matrix = ({
  width,
  height,
  cellSize,
  matrix,
  onRequestMatrixCellChange,
  activeSolution,
}) => {
  const wrapperStyle = {
    width,
    height,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 5,
  };
  const flexRowStyle = {
    display: 'flex',
    flexDirection: 'row',
  };
  const columnCount = matrix.get('columnCount');
  const halfCellSize = cellSize * 0.5;

  return Style.it(`
    @keyframes reveal {
      0% {opacity: 0; }
      100% {opacity: 1; }
    }

    .${MATRIX_CELL_WRAPPER} {
      width: ${cellSize}px;
      height: ${cellSize}px;
      position: relative;
      stroke: ${INACTIVE_COLOR};
    }

    .${MATRIX_CELL_SVG_WRAPPER} {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 0;
    }

    .${MATRIX_CELL_SVG} {
      width: 100%;
      height: 100%;
    }

    .${MATRIX_CELL_INPUT_WRAPPER} {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    .${MATRIX_CELL_INPUT} {
      transition: color ease 1s;
      animation: 1s ease reveal;
      pointer-events: all;
      text-align: center;
      background: none;
      border: none;
      outline: none;
    }

    .${MATRIX_CELL_INPUT_ACTIVE} {
      color: ${PRIMARY_BORDER_COLOR};
    }

    .${MATRIX_CELL_INPUT_PREVIEW} {
      color: ${ACCENT_BORDER_COLOR};
    }

    .${MATRIX_CELL_INPUT_INACTIVE} {
      color: ${INACTIVE_COLOR};
    }

    .${MATRIX_CELL_MAIN_CIRCLE} {
      fill: ${BACKGROUND_COLOR};
      fill-opacity: 0.65;
      stroke-width: 1px;
      transform-origin: ${halfCellSize}px ${halfCellSize}px;
      transition: stroke ease 1s, transform ease 0.5s;
      vector-effect: non-scaling-stroke;
      animation: 1s ease reveal;
    }

    .${MATRIX_CELL_MAIN_CIRCLE_ACTIVE} {
      stroke: ${PRIMARY_BORDER_COLOR};
      transform: scale(1.5);
    }

    .${MATRIX_CELL_MAIN_CIRCLE_PREVIEW} {
      stroke: ${ACCENT_BORDER_COLOR};
      transform: scale(1.25);
    }

    .${MATRIX_CELL_MAIN_CIRCLE_INACTIVE} {
      stroke: ${INACTIVE_COLOR};
      transform: scale(1);
    }

    .${MATRIX_CELL_ACTIVE_CIRCLE} {
      fill: none;
      stroke: ${PRIMARY_COLOR};
      stroke-width: 1px;
      vector-effect: non-scaling-stroke;
    }

    .${MATRIX_CELL_ACTIVE_CIRCLE_VISIBLE} {
      stroke-dasharray: 30px 10px;
    }

    .${MATRIX_CELL_ACTIVE_CIRCLE_HIDDEN} {
      stroke-dasharray: 0px 40px;
      transition: stroke-dasharray ease 0.5s;
    }

    .${MATRIX_CELL_PREVIEW_CIRCLE} {
      fill: none;
      stroke: ${ACCENT_COLOR};
      stroke-width: 1px;
    }

    .${MATRIX_CELL_PREVIEW_CIRCLE_VISIBLE} {
      stroke-dasharray: 25px 10px;
    }

    .${MATRIX_CELL_PREVIEW_CIRCLE_HIDDEN} {
      stroke-dasharray: 0px 35px;
      transition: stroke-dasharray ease 0.5s;
    }
    `, (
      <div style={wrapperStyle}>
        {
          matrix.get('cells').groupBy(
            (cell, key) => Math.floor(key / columnCount)
          ).entrySeq().map(
            ([row, cells]) => <div style={flexRowStyle} key={row}>
              {
                cells.entrySeq().map(
                  ([column, cell]) => <MatrixCell
                    key={`${row}-${column}`}
                    cell={cell}
                    cellSize={cellSize}
                    onRequestMatrixCellChange={onRequestMatrixCellChange}
                    activeSolution={activeSolution}
                  />
                )
              }
            </div>
          )
        }
      </div>
  ));
};

Matrix.defaultProps = {
  activeSolution: null,
};

Matrix.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  onRequestMatrixCellChange: PropTypes.func.isRequired,
  activeSolution: PropTypes.number.isRequired,
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      value: PropTypes.number.isRequired,
      activePosition: PropTypes.number,
      previewPosition: PropTypes.number,
    })).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default PureImmutable()(Matrix);
