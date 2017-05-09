import React from 'react';
import PropTypes from 'prop-types';

const SolutionPath = ({
  width,
  height,
  pathData,
  isActive,
  isPreview,
  pathOffset,
}) => {
  const strokeWidth = () => {
    if (isActive || isPreview) {
      return 6;
    }
    return 3;
  };

  const strokeColor = () => {
    if (isActive) {
      return 'white';
    }
    return 'steelblue';
  };

  const zIndex = () => {
    if (isActive) {
      return 2;
    } else if (isPreview) {
      return 1;
    }
    return 0;
  };

  const wrapperStyle = {
    width,
    height,
    position: 'absolute',
    left: 0,
    top: 0,
    fill: 'none',
    stroke: strokeColor(),
    strokeWidth: strokeWidth(),
    strokeDasharray: '0px 8px',
    strokeLinecap: 'round',
    strokeDashoffset: pathOffset,
    zIndex: zIndex(),
    transition: 'stroke-width 0.5s, stroke 0.5s',
  };

  return (
    <svg style={wrapperStyle}>
      <path d={pathData} />
    </svg>
  );
};

SolutionPath.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  pathData: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
  pathOffset: PropTypes.number.isRequired,
};

export default SolutionPath;
