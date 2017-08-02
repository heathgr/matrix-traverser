import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Style from 'style-it';
import PureImmutable from '../helpers/hocs/PureImmutable';
import SolutionPathsInteractionHandler from './SolutionPathsInteractionHandler';
import SolutionPath from './SolutionPath';
import {
  PRIMARY_COLOR,
  ACCENT_COLOR,
  INACTIVE_COLOR,
} from '../constants/uiColors';
import {
  SOLUTION_PATH,
  SOLUTION_PATH_ACTIVE,
  SOLUTION_PATH_PREVIEW,
  SOLUTION_PATH_INACTIVE,
} from '../constants/styleNames';

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

  return Style.it(`
    @keyframes pathSlide {
      0% { stroke-dashoffset: 0px; }
      100% { stroke-dashoffset: -18px; }
    }

    @keyframes reveal {
      0% {stroke-opacity: 0; }
      100% {stroke-opacity: 1; }
    }

    .${SOLUTION_PATH} {
      fill: none;
      stroke-dasharray: 10px 8px;
      stroke-linecap: round;
      width: ${width}px;
      height: ${height}px;
      position: absolute;
      top: 0px;
      left: 0px;
      animation:
        0.35s linear infinite normal pathSlide,
        1s ease reveal;
      transition: stroke-width ease 0.5s, stroke ease 1s;
      cursor: pointer;
    }

    .${SOLUTION_PATH_ACTIVE} {
      stroke: ${PRIMARY_COLOR};
      stroke-width: 3px;
      z-index: 2;
    }

    .${SOLUTION_PATH_PREVIEW} {
      stroke: ${ACCENT_COLOR};
      stroke-width: 1.5px;
      z-index: 1;
    }

    .${SOLUTION_PATH_INACTIVE} {
      stroke: ${INACTIVE_COLOR};
      stroke-width: 0.75px;
      z-index: 0;
    }
    `, (
      <div style={wrapperStyle}>
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
              pathData={pathData}
              isActive={id === activeSolution}
              isPreview={id === previewSolution}
            />
          )
        }
      </div>
    )
  );
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
