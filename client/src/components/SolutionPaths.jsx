import React from 'react';
import PropTypes from 'prop-types';
import glamourous from 'glamorous';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';
import SolutionPath from './SolutionPath';

const SolutionPaths = ({
  solutionPathsData,
  width,
  height,
  cellSize,
  activeSolution,
  previewSolution,
  onSolutionClicked,
  onSolutionHover,
}) => {
  const Wrapper = glamourous.svg({
    width,
    height,
    position: 'absolute',
    top: 0,
  });

  const resizedSolutionPathsData = solutionPathsData.map(
    (pathData, i) => ({
      id: i,
      data: pathData.map(
        segment => segment.map(
          point => `${(point.get('x') * cellSize) + (cellSize * 0.5)},${(point.get('y') * cellSize) + (cellSize * 0.5)}`
        ).join(' ')
      ).map(
        (segment, j) => (j === 0 ? `M${segment}` : `C${segment}`)
      ).join(' '),
    })
  ).sort(
    (a, b) => {
      if (a.id === activeSolution) {
        return 1;
      } else if (a.id === previewSolution && b.id !== activeSolution) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  return (<Wrapper>
    {
      resizedSolutionPathsData.map(
        ({ id, data }) => <SolutionPath
          key={id}
          id={id}
          pathData={data}
          isActive={id === activeSolution}
          isPreview={id === previewSolution}
          onSolutionClicked={onSolutionClicked}
          onSolutionHover={onSolutionHover}
        />
      )
    }
  </Wrapper>);
};

SolutionPaths.defaultProps = {
  activeSolution: null,
  previewSolution: null,
  solutionPathsData: List([]),
};

SolutionPaths.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  solutionPathsData: ImmutablePropTypes.listOf(
    ImmutablePropTypes.list
  ),
  activeSolution: PropTypes.number,
  previewSolution: PropTypes.number,
  onSolutionClicked: PropTypes.func.isRequired,
  onSolutionHover: PropTypes.func.isRequired,
};

export default PureImmutable()(SolutionPaths);
