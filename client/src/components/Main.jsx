import React, { PropTypes } from 'react';

const Main = ({ matrix }) => (
  <div>
    <div>{'Welcome to Matrix Traversal from main component!!!'}</div>
    <div>{matrix.get('cells').size}</div>
  </div>
);

export default Main;

Main.propTypes = {
  matrix: PropTypes.object.isRequired,
};
