import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  getMatrix,
  getSolutionPathsData,
  getSolutions,
  getActiveSolution,
  getPreviewSolution,
} from '../reducers/root';
import MatrixResizer from '../components/MatrixResizer';
import SolutionsList from '../components/SolutionsList';
import PureImmutable from '../helpers/hocs/PureImmutable';
import {
  setActiveSolution,
  setNextActiveSolution,
  setPreviousActiveSolution,
  setPreviewSolution,
} from '../actions/solutionsActions';

const Container = ({
  matrix,
  solutions,
  activeSolution,
  previewSolution,
  solutionPathsData,
  onSolutionClicked,
  onNextSolutionClicked,
  onPreviousSolutionClicked,
  onSolutionHover,
}) => {
  const FlexFullWidthHeight = glamorous.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

  const MatrixWrapper = glamorous.div({
    display: 'flex',
    background: 'aqua',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  });

  return (
    <FlexFullWidthHeight>
      <MatrixWrapper>
        <MatrixResizer
          {...{
            matrix,
            solutionPathsData,
            activeSolution,
            previewSolution,
            onSolutionClicked,
            onSolutionHover,
          }}
        />
      </MatrixWrapper>
      <SolutionsList
        {...{
          solutions,
          activeSolution,
          previewSolution,
          onSolutionClicked,
          onNextSolutionClicked,
          onPreviousSolutionClicked,
          onSolutionHover,
        }}
      />
    </FlexFullWidthHeight>
  );
};

Container.defaultProps = {
  previewSolution: null,
};

Container.propTypes = {
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
  solutionPathsData: ImmutablePropTypes.listOf(
    ImmutablePropTypes.list,
  ).isRequired,
  solutions: ImmutablePropTypes.listOf(
    ImmutablePropTypes.listOf(
      PropTypes.number
    )
  ).isRequired,
  activeSolution: PropTypes.number.isRequired,
  previewSolution: PropTypes.number,
  onSolutionClicked: PropTypes.func.isRequired,
  onNextSolutionClicked: PropTypes.func.isRequired,
  onPreviousSolutionClicked: PropTypes.func.isRequired,
  onSolutionHover: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  matrix: getMatrix(state),
  solutions: getSolutions(state),
  activeSolution: getActiveSolution(state),
  previewSolution: getPreviewSolution(state),
  solutionPathsData: getSolutionPathsData(state),
});

const dispatchToProps = dispatch => ({
  onSolutionClicked: (solution) => { dispatch(setActiveSolution(solution)); },
  onNextSolutionClicked: () => { dispatch(setNextActiveSolution()); },
  onPreviousSolutionClicked: () => { dispatch(setPreviousActiveSolution()); },
  onSolutionHover: (solution) => { dispatch(setPreviewSolution(solution)); },
});
const MatrixContainer = compose(
  connect(
    stateToProps,
    dispatchToProps
  ),
  PureImmutable()
)(Container);

export default MatrixContainer;
