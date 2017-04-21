import React from 'react';
import PropTypes from 'prop-types';
import glamourous from 'glamorous';
import ImutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';
import SolutionPath from './SolutionPath';

const SolutionPaths = ({ solutionPathsData, width, height, cellSize }) => {
  const Wrapper = glamourous.svg({
    width,
    height,
    fill: 'none',
    stroke: 'tomato',
    strokeWidth: 2,
    position: 'absolute',
    top: 0,
  });

  return (<Wrapper>
    {
      solutionPathsData.map(
        pathData => pathData.map(
          segment => segment.map(
            point => `${(point.get('x') * cellSize) + (cellSize * 0.5)},${(point.get('y') * cellSize) + (cellSize * 0.5)}`
          ).join(' ')
        ).map(
          (segment, i) => (i === 0 ? `M${segment}` : `C${segment}`)
        ).join(' ')
      ).map(
        (pathData, i) => <SolutionPath key={i} pathData={pathData} />
      )
    }
  </Wrapper>);
};

SolutionPaths.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  solutionPathsData: ImutablePropTypes.listOf(
    ImutablePropTypes.list
  ).isRequired,
};

export default PureImmutable()(SolutionPaths);
