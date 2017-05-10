import React from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';

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

  return Style.it(`
    .path {
      fill: none;
      stroke: ${strokeColor()};
      stroke-width: ${strokeWidth()}px;
      stroke-dasharray: 0px 8px;
      stroke-linecap: round;
      stroke-dashoffset: ${pathOffset};
      width: ${width}px;
      height: ${height}px;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: ${zIndex()};
      transition: stroke-width ease 1s, stroke ease 0.5s;
    }
  `, (
    <svg className='path'>
      <path d={pathData} />
    </svg>
  ));
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
