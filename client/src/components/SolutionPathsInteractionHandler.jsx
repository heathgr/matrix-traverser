import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import PureImmutable from '../helpers/hocs/PureImmutable';

const SolutionPathsInteractionHandler = ({ width, height, solutionPathsData, onSolutionClicked, onSolutionHover }) => {
  const wrapperStyle = {
    width,
    height,
    fill: 'none',
    stroke: 'rgba(0, 0, 0, 0)',
    strokeWidth: 6,
    position: 'absolute',
    zIndex: 3,
    // pointerEvents: 'none',
  };

  return (
    <svg style={wrapperStyle}>
      {
        solutionPathsData.map(
          (pathData, i) => <path
            d={pathData}
            key={i}
            onClick={() => onSolutionClicked(i)}
            onMouseEnter={() => onSolutionHover(i)}
            onMouseLeave={() => onSolutionHover(null)}
          />
        )
      }
    </svg>
  );
};


SolutionPathsInteractionHandler.defaultProps = {
  solutionPathsData: List([]),
};

SolutionPathsInteractionHandler.propTypes = {
  solutionPathsData: ImmutablePropTypes.listOf(
    PropTypes.string,
  ),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onSolutionClicked: PropTypes.func.isRequired,
  onSolutionHover: PropTypes.func.isRequired,
};

export default PureImmutable()(SolutionPathsInteractionHandler);
