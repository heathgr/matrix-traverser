import React from 'react';
import { connect } from 'react-redux';

const Matrix = () => (<div>Matrix</div>);

const stateToProps = state => ({
  matrix: state.matrix,
  solutions: state.solutions,
});

const MatrixContainer = connect(stateToProps)(Matrix);

export default MatrixContainer;
