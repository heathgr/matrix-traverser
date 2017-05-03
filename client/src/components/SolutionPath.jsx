import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

class SolutionPath extends Component {

  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }

  componentDidMount() {
    this.animatePathOffset = this.animatePathOffset.bind(this);
    this.animatePathOffset();
  }

  pathRef = null;

  animatePathOffset() {
    if (this.pathRef) {
      this.setState({ offset: (-performance.now()) * 0.025 });
    }
    window.requestAnimationFrame(this.animatePathOffset);
  }

  render() {
    const {
      width,
      height,
      pathData,
      isActive,
      isPreview,
      id,
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
      strokeDashoffset: this.state.offset,
      zIndex: zIndex(),
      transition: 'stroke-width 0.5s, stroke 0.5s',
    };

    return (
      <svg style={wrapperStyle}>
        <path
          d={pathData}
          onClick={() => onSolutionClicked(id)}
          ref={(input) => { this.pathRef = input; }}
        />
      </svg>
    );
  }
}

SolutionPath.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  pathData: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default SolutionPath;
