import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getMatrix } from '../reducers/root';
import MatrixCell from '../components/MatrixCell';

const Matrix = ({ matrix }) => (<div>
  {
    matrix.get('cells').map(
      cell => (<MatrixCell
        key={cell.hashCode()}
        cell={cell}
      />)
    )
  }
</div>);

Matrix.propTypes = {
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

const stateToProps = state => ({
  matrix: getMatrix(state),
});

const MatrixContainer = connect(stateToProps)(Matrix);

export default MatrixContainer;
