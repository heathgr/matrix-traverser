import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Style from 'style-it';
import PureImmutable from '../helpers/hocs/PureImmutable';

const MatrixCell = ({ cell, cellSize }) => {
  const activePosition = cell.get('activePosition');
  const previewPosition = cell.get('previewPosition');
  const halfCellSize = cellSize * 0.5;

  const circleScale = () => {
    if (activePosition !== null) {
      return 1.5;
    } else if (previewPosition !== null) {
      return 1.25;
    }
    return 1;
  };

  const mainColor = () => {
    if (activePosition !== null) {
      return '#eeeeee';
    } else if (previewPosition !== null) {
      return '#929899';
    }
    return '#525252';
  };

  return Style.it(`
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
      stroke: ${mainColor()};
      stroke-width: 1px;
      transform: scale(${circleScale()});
      transform-origin: ${halfCellSize}px ${halfCellSize}px;
      transition: stroke ease 1s, transform ease 0.5s;
      vector-effect: non-scaling-stroke;
    }

    .text {
      color: ${mainColor()};
      transition: color ease 1s;
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
        </svg>
      </div>
    </div>
  ));
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

