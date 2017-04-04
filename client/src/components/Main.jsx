import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Main = ({ matrix }) => (
  <div>
    <div>{'Welcome to Matrix Traversal from main component!!!'}</div>
    <div>{matrix.get('cells').size}</div>
    <div>{'noice!!!'}</div>
  </div>
);

Main.propTypes = {
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Main;
