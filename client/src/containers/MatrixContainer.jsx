import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MatrixCell from '../components/MatrixCell';

const Matrix = ({ matrix }) => (<div>
  {
    matrix.get('cells').map(
      cell => (<MatrixCell
        key={cell.hashCode()}
        column={cell.get('column')}
        row={cell.get('row')}
        value={cell.get('value')}
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
  matrix: state.matrix,
  solutions: state.solutions,
});

const MatrixContainer = connect(stateToProps)(Matrix);

export default MatrixContainer;
