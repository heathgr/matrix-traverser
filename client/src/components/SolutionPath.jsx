import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

class SolutionPath extends Component {

  componentDidMount() {
    console.log('Path data: ', this.props.pathData);
    console.log(this.pathRef.getTotalLength());
    console.log();
  }

  pathRef = null;

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
      if (isActive) {
        return 10;
      } else if (isPreview) {
        return 8;
      }
      return 6;
    };

    const strokeColor = () => {
      if (isActive) {
        return 'white';
      } else if (isPreview) {
        return 'tomato';
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
      zIndex: zIndex(),
      transition: '0.5s',
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
