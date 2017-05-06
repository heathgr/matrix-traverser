import React from 'react';
import PropTypes from 'prop-types';
import PureImmutable from '../helpers/hocs/PureImmutable';

const MatrixCell = ({ cell, cellSize }) => {
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
  };

  const circleStyle = {
    fill: 'steelblue',
    fillOpacity: '0.85',
    stroke: 'white',
    strokeWidth: '2',
  };

  return (
  <div style={wrapperStyle}>
    <svg width={cellSize} height={cellSize}>
      <circle cx={cellSize * 0.5} cy={cellSize * 0.5} r={cellSize * 0.15} style={circleStyle}/>
    </svg>
    <div style={textStyle}>
      {cell}
    </div>
  </div>
  );
};

MatrixCell.propTypes = {
  cell: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
};


export default PureImmutable()(MatrixCell);

