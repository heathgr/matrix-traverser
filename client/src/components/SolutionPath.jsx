import React from 'react';
import PropTypes from 'prop-types';

const SolutionPath = ({ pathData }) => (<path d={pathData} />);

SolutionPath.propTypes = {
  pathData: PropTypes.string.isRequired,
};

export default SolutionPath;
