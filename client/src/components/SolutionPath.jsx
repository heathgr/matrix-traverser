import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import PureImmutable from '../helpers/hocs/PureImmutable';

class SolutionPath extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pathLength: 0,
    };
  }

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

    const getPathLength = ref => {
      if (ref) {
        if (ref.getTotalLength){
          return ref.getTotalLength();
        }
        return 1;
      }
      return 0;
    };

    return Style.it(`
      @keyframes pathSlide-${id} {
        0% { stroke-dashoffset: 0px; }
        100% { stroke-dashoffset: -${this.state.pathLength}px; }
      }

      @keyframes reveal {
        0% {stroke-opacity: 0; }
        100% {stroke-opacity: 1; }
      }

      .path {
        fill: none;
        stroke: ${strokeColor()};
        stroke-width: ${strokeWidth()}px;
        stroke-dasharray: 0px 8px;
        stroke-linecap: round;
        width: ${width}px;
        height: ${height}px;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: ${zIndex()};
        animation:
          ${this.state.pathLength * 0.05}s linear infinite normal pathSlide-${id},
          1s ease reveal;
        transition: stroke-width ease 1s, stroke ease 0.5s;
      }
    `, (
      <svg className='path'>
        <path
          d={pathData}
          ref={
            (ref) => {
              if (!this.state.pathLength) {
                this.setState({
                  ...this.state,
                  pathLength: getPathLength(ref),
                });
              }
            }
          }
        />
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
