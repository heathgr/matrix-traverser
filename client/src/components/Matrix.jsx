import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';
import MatrixCell from './MatrixCell';

const Matrix = ({ width, height, cellSize, matrix }) => {
  const Wrapper = glamorous.div({
    width,
    height,
    display: 'flex',
    flexWrap: 'wrap',
    background: 'palegoldenrod',
  });

  return (<Wrapper>
    {
      matrix.get('cells').map(
        cell => <MatrixCell cell={cell} cellSize={cellSize} />
      )
    }
  </Wrapper>);
};

Matrix.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        column: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default PureImmutable()(Matrix);
