import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';

const MatrixCell = ({ cell, cellSize }) => {
  const row = cell.get('row');
  const column = cell.get('column');
  const value = cell.get('value');
  const Wrapper = glamorous.div({
    width: cellSize,
    height: cellSize,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (<Wrapper>
    {value}
  </Wrapper>);
};

MatrixCell.propTypes = {
  cell: ImmutablePropTypes.mapContains({
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  cellSize: PropTypes.number.isRequired,
};


export default PureImmutable()(MatrixCell);

