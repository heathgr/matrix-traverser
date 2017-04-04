/** @module components/Main */

import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

/**
 * The main/root component
 */
const Main = ({ matrix }) => (
  <div>
    <div>{'Welcome to the main component :)'}</div>
    <div>{matrix.get('cells').size}</div>
    <div>{'nooice!!!'}</div>
  </div>
);

Main.propTypes = {
  /** A matrix property */
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Main;
