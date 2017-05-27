import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Style from 'style-it';
import PureImmutable from '../helpers/hocs/PureImmutable';
import {
  PRIMARY_COLOR,
  ACCENT_COLOR,
  INACTIVE_COLOR,
  PRIMARY_BORDER_COLOR,
  ACCENT_BORDER_COLOR,
} from '../constants/uiColors';

const MatrixCell = ({
  cell,
  cellSize,
}) => {
  const activePosition = cell.get('activePosition');
  const previewPosition = cell.get('previewPosition');
  const halfCellSize = cellSize * 0.5;

  const circleScale = (() => {
    if (activePosition !== null) {
      return 1.5;
    } else if (previewPosition !== null) {
      return 1.25;
    }
    return 1;
  })();

  const mainColor = (() => {
    if (activePosition !== null) {
      return PRIMARY_BORDER_COLOR;
    } else if (previewPosition !== null) {
      return ACCENT_BORDER_COLOR;
    }
    return INACTIVE_COLOR;
  })();

  const activeStrokeDasharray = (() => {
    if (activePosition !== null) {
      return '30px 10px';
    }
    return '0px 40px';
  })();

  const previewStrokeDasharray = (() => {
    if (previewPosition !== null) {
      return '25px 10px';
    }
    return '0px 35px';
  })();

  return Style.it(`
    @keyframes reveal {
      0% {opacity: 0; }
      100% {opacity: 1; }
    }

    .wrapper {
      width: ${cellSize}px;
      height: ${cellSize}px;
      position: relative;
    }

    .textPositioner {
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

    .circlesPositioner {
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

    .cellSvg {
      width: 100%;
      height: 100%;
    }

    .mainCircle {
      fill: #152026;
      fill-opacity: 0.65;
      stroke: ${mainColor};
      stroke-width: 1px;
      transform: scale(${circleScale});
      transform-origin: ${halfCellSize}px ${halfCellSize}px;
      transition: stroke ease 1s, transform ease 0.5s;
      vector-effect: non-scaling-stroke;
      animation: 1s ease reveal;
    }

    .activeCircle {
      fill: none;
      stroke: ${PRIMARY_COLOR};
      stroke-width: 1px;
      stroke-dasharray: ${activeStrokeDasharray};
      transition: stroke-dasharray ease 0.5s ${activePosition * 0.2}s;
      vector-effect: non-scaling-stroke;
    }

    .previewCircle {
      fill: none;
      stroke: ${ACCENT_COLOR};
      stroke-dasharray: ${previewStrokeDasharray};
      stroke-width: 1px;
      transition: stroke-dasharray ease 0.5s ${previewPosition * 0.2}s;
    }

    .text {
      color: ${mainColor};
      transition: color ease 1s;
      animation: 1s ease reveal;
    }
  `, (
    <div className='wrapper'>
      <div className='textPositioner'>
        <div className='text'>
          {cell.get('value')}
        </div>
      </div>
      <div className='circlesPositioner'>
        <svg className='cellSvg'>
          <circle
            className='mainCircle'
            cx={halfCellSize}
            cy={halfCellSize}
            r={cellSize * 0.1}
          />
          <circle
            className='activeCircle'
            cx={halfCellSize}
            cy={halfCellSize}
            r={cellSize * 0.2}
          />
          <circle
            className='previewCircle'
            cx={halfCellSize}
            cy={halfCellSize}
            r={cellSize * 0.175}
          />
        </svg>
      </div>
    </div>
  ));
};

MatrixCell.defaultProps = {
  activeSolution: null,
};

MatrixCell.propTypes = {
  cell: ImmutablePropTypes.mapContains({
    value: PropTypes.number.isRequired,
    activePosition: PropTypes.number,
    previewPosition: PropTypes.number,
  }).isRequired,
  cellSize: PropTypes.number.isRequired,
};


export default PureImmutable()(MatrixCell);

