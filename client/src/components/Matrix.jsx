import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';
import MatrixCell from './MatrixCell';

const Matrix = ({ width, height, cellSize, matrix }) => {
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

  return (<div style={wrapperStyle}>
    {
      matrix.get('cells').groupBy(
        (cell, key) => Math.floor(key / columnCount)
      ).entrySeq().map(
        ([row, cells]) => <div style={flexRowStyle} key={row}>
          {
            cells.entrySeq().map(
              ([column, cell]) => <MatrixCell key={`${row}-${column}`} cell={cell} cellSize={cellSize} />
            )
          }
        </div>
      )
    }
  </div>);
};

Matrix.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default PureImmutable()(Matrix);
