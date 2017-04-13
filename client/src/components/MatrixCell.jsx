import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';

const MatrixCell = ({ cell }) => {
  const row = cell.get('row');
  const column = cell.get('column');
  const value = cell.get('value');

  return (<div>
    {value}
  </div>);
};

MatrixCell.propTypes = {
  cell: ImmutablePropTypes.mapContains({
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
};


export default PureImmutable()(MatrixCell);

