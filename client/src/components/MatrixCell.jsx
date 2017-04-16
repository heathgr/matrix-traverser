import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import PureImmutable from '../helpers/hocs/PureImmutable';

const MatrixCell = ({ cell, cellSize }) => {
  const Wrapper = glamorous.div({
    width: cellSize,
    height: cellSize,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (<Wrapper>
    {cell}
  </Wrapper>);
};

MatrixCell.propTypes = {
  cell: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
};


export default PureImmutable()(MatrixCell);

