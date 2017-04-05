/** @module components/Main */

import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import MatrixCell from './MatrixCell';

const Main = ({ matrix }) => (
  <div>
    <div>{'Welcome to the main component :)'}</div>
    <div>{'This is the matrix:'}</div>
    <div>
      {
        matrix.get('cells').map(
          value => (
            <MatrixCell value={value} />
          )
        )
      }
    </div>
    <div>{'nooice!!!'}</div>
  </div>
);

Main.propTypes = {
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Main;
