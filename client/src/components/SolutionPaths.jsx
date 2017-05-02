import React, {Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';
import SolutionPathsInteractionHandler from './SolutionPathsInteractionHandler';
import SolutionPath from './SolutionPath';

class SolutionPaths extends Component {
  componentDidMount() {
    console.log('Solution Paths Mounted...');
  }

  render() {
    const {
      solutionPathsData,
      width,
      height,
      cellSize,
      activeSolution,
      previewSolution,
      onSolutionClicked,
      onSolutionHover,
    } = this.props;

    const wrapperStyle = {
      width,
      height,
      position: 'absolute',
      top: 0,
    };

    const resizedSolutionPathsData = solutionPathsData.map(
      pathData => pathData.map(
        segment => segment.map(
          point => `${(point.get('x') * cellSize) + (cellSize * 0.5)},${(point.get('y') * cellSize) + (cellSize * 0.5)}`
        ).join(' ')
      ).map(
        (segment, j) => (j === 0 ? `M${segment}` : `C${segment}`)
      ).join(' ')
    );

    return (<div style={wrapperStyle}>
      <SolutionPathsInteractionHandler
        width={width}
        height={height}
        solutionPathsData={resizedSolutionPathsData}
        onSolutionClicked={onSolutionClicked}
        onSolutionHover={onSolutionHover}
      />
      {
        resizedSolutionPathsData.map(
          (pathData, id) => <SolutionPath
            key={id}
            id={id}
            width={width}
            height={height}
            pathData={pathData}
            isActive={id === activeSolution}
            isPreview={id === previewSolution}
            onSolutionClicked={onSolutionClicked}
            onSolutionHover={onSolutionHover}
          />
        )
      }
    </div>);
  }
}

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

export default SolutionPaths;
