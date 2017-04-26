import React from 'react';
import PropTypes from 'prop-types';

const SolutionPath = ({
  pathData,
  isActive,
  isPreview,
  onSolutionClicked,
  onSolutionHover,
  id,
}) => {
  const pathStyle = {
    fill: 'none',
    stroke: isActive ? 'white' : isPreview ? 'steelblue' : 'tomato',
    strokeWidth: (isActive || isPreview) ? 8 : 4,
    cursor: 'pointer',
    transition: '3s',
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
  isPreview: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onSolutionClicked: PropTypes.func.isRequired,
  onSolutionHover: PropTypes.func.isRequired,
};

export default SolutionPath;
