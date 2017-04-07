import React, { PropTypes } from 'react';
import PureImmutable from '../helpers/components/PureImmutable';

const MatrixCell = ({ column, row, value }) => (
  <div style={{ position: 'absolute', left: column * 50, top: row * 50 }}>
    {value}
  </div>
);

MatrixCell.propTypes = {
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default PureImmutable(MatrixCell);

