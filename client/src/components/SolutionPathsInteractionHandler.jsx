import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import glamorous from 'glamorous';
import PureImmutable from '../helpers/hocs/PureImmutable';

const SolutionPathsInteractionHandler = ({ width, height, solutionPathsData, onSolutionClicked, onSolutionHover }) => {
  const Wrapper = glamorous.svg({
    width,
    height,
    fill: 'none',
    stroke: 'rgba(0, 0, 0, 0)',
    strokeWidth: 15,
    position: 'absolute',
    zIndex: 10,
  });

  return (
    <Wrapper>
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
    </Wrapper>
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
