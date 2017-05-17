import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';

const MatrixCell = ({ cell, cellSize }) => {
  const activePosition = cell.get('activePosition');
  const previewPosition = cell.get('previewPosition');
  const opacity = (() => {
    if (activePosition !== null) {
      return 1;
    } else if (previewPosition !== null) {
      return 0.85;
    }
    return 0.5;
  })();

  const wrapperStyle = {
    width: cellSize,
    height: cellSize,
    position: 'relative',
  };

  const textStyle = {
    width: cellSize,
    height: cellSize,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    lef: 0,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'sans-serif',
    color: 'white',
    opacity,
    transition: '1s',
  };

  const circleStyle = {
    fill: 'steelblue',
    fillOpacity: '0.85',
    stroke: 'white',
    strokeWidth: '2',
    opacity,
    transition: '1s',
  };

  return (
  <div style={wrapperStyle}>
    <svg width={cellSize} height={cellSize}>
      <circle cx={cellSize * 0.5} cy={cellSize * 0.5} r={cellSize * 0.15} style={circleStyle}/>
    </svg>
    <div style={textStyle}>
      {cell.get('value')}
    </div>
  </div>
  );
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

