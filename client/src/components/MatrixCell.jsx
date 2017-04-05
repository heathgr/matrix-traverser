import React, { PropTypes } from 'react';

const MatrixCell = ({ value }) => (
  <div>
    {value}
  </div>
);

MatrixCell.propTypes = {
  value: PropTypes.number.isRequired,
};

export default MatrixCell;
