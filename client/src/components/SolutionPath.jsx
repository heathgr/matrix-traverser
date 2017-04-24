import React from 'react';
import PropTypes from 'prop-types';

const SolutionPath = ({
  pathData,
  isActive,
  onSolutionClicked,
  onSolutionHover,
  id,
}) => {
  const pathStyle = {
    fill: 'none',
    stroke: isActive ? 'white' : 'tomato',
    strokeWidth: isActive ? 8 : 4,
    cursor: 'pointer',
  };

  return (
    <path
      d={pathData}
      style={pathStyle}
      onClick={() => onSolutionClicked(id)}
      onMouseEnter={() => onSolutionHover(id)}
      onMouseLeave={() => onSolutionHover(null)}
    />
  );
};

SolutionPath.propTypes = {
  pathData: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onSolutionClicked: PropTypes.func.isRequired,
  onSolutionHover: PropTypes.func.isRequired,
};

export default SolutionPath;
