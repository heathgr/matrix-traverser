import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import PureImmutable from '../helpers/hocs/PureImmutable';

class SolutionPath extends Component {

  render() {
    const {
      id,
      width,
      height,
      pathData,
      isActive,
      isPreview,
    } = this.props;

    const strokeWidth = () => {
      if (isActive) {
        return 3;
      } else if (isPreview) {
        return 1.5;
      }
      return 0.75;
    };

    const strokeColor = () => {
      if (isActive) {
        return '#FF4C0C';
      } else if (isPreview) {
        return '#FF0D0D';
      }
      return '#525252';
    };

    const zIndex = () => {
      if (isActive) {
        return 2;
      } else if (isPreview) {
        return 1;
      }
      return 0;
    };

    return Style.it(`
      @keyframes pathSlide-${id} {
        0% { stroke-dashoffset: 0px; }
        100% { stroke-dashoffset: -18px; }
      }

      @keyframes reveal {
        0% {stroke-opacity: 0; }
        100% {stroke-opacity: 1; }
      }

      .path {
        fill: none;
        stroke: ${strokeColor()};
        stroke-width: ${strokeWidth()}px;
        stroke-dasharray: 10px 8px;
        stroke-linecap: round;
        width: ${width}px;
        height: ${height}px;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: ${zIndex()};
        animation:
          0.35s linear infinite normal pathSlide-${id},
          1s ease reveal;
        transition: stroke-width ease 0.5s, stroke ease 1s;
        cursor: pointer;
      }
    `, (
      <svg className='path'>
        <path d={pathData} />
      </svg>
    ));
  }
}

SolutionPath.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  pathData: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
};

export default PureImmutable()(SolutionPath);
