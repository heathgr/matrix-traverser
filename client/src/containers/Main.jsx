import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  getDetailedMatrix,
  getSolutionPathsData,
  getSolutions,
  getActiveSolution,
  getPreviewSolution,
  getIsCreateMatrixUIVisible,
  getIsIntroductionUIVisible,
  getCreateMatrixColumnCount,
  getCreateMatrixRowCount,
} from '../reducers/root';
import MatrixResizer from '../components/MatrixResizer';
import SolutionsList from '../components/SolutionsList';
import CreateMatrix from '../components/CreateMatrix';
import Introduction from '../components/Introduction';
import PureImmutable from '../helpers/hocs/PureImmutable';
import {
  setActiveSolution,
  setNextActiveSolution,
  setPreviousActiveSolution,
  setPreviewSolution,
} from '../actions/solutionsActions';
import {
  toggleCreateMatrixUI,
  toggleIntroductionUI,
  setCreateMatrixColumnCount,
  setCreateMatrixRowCount,
} from '../actions/uiActions';
import {
  requestRandomMatrix,
  requestMatrixCellChange,
} from '../actions/matrixActions';

export const Container = ({
  matrix,
  solutions,
  activeSolution,
  previewSolution,
  solutionPathsData,
  onSolutionClicked,
  onNextSolutionClicked,
  onPreviousSolutionClicked,
  onSolutionHover,
  isIntroductionUIVisible,
  isCreateMatrixUIVisible,
  createMatrixColumnCount,
  createMatrixRowCount,
  onToggleCreateMatrixUI,
  onToggleIntroductionUI,
  onRequestRandomMatrix,
  onRequestMatrixCellChange,
  onSetCreateMatrixColumnCount,
  onSetCreateMatrixRowCount,
}) => {
  const matrixWrapperStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  };

  const wrapperStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={wrapperStyle}>
      {
        isCreateMatrixUIVisible && <CreateMatrix
          onToggleCreateMatrixUI={onToggleCreateMatrixUI}
          onRequestRandomMatrix={onRequestRandomMatrix}
          createMatrixColumnCount={createMatrixColumnCount}
          createMatrixRowCount={createMatrixRowCount}
          onSetCreateMatrixColumnCount={onSetCreateMatrixColumnCount}
          onSetCreateMatrixRowCount={onSetCreateMatrixRowCount}
        />
      }
      {
        isIntroductionUIVisible && <Introduction onToggleIntroductionUI={onToggleIntroductionUI} />
      }
      <div style={matrixWrapperStyle}>
        <MatrixResizer
          {...{
            matrix,
            solutionPathsData,
            activeSolution,
            previewSolution,
            onSolutionClicked,
            onSolutionHover,
            onRequestMatrixCellChange,
          }}
        />
      </div>
      <SolutionsList
        {...{
          solutions,
          activeSolution,
          previewSolution,
          onSolutionClicked,
          onNextSolutionClicked,
          onPreviousSolutionClicked,
          onSolutionHover,
          onToggleCreateMatrixUI,
          onToggleIntroductionUI,
        }}
      />
    </div>
  );
};

Container.defaultProps = {
  previewSolution: null,
};

Container.propTypes = {
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      value: PropTypes.number.isRequired,
      activePosition: PropTypes.number,
      previewPosition: PropTypes.number,
    })).isRequired,
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
  onSetCreateMatrixColumnCount: PropTypes.func.isRequired,
  onSetCreateMatrixRowCount: PropTypes.func.isRequired,
  onToggleCreateMatrixUI: PropTypes.func.isRequired,
  onToggleIntroductionUI: PropTypes.func.isRequired,
  onRequestRandomMatrix: PropTypes.func.isRequired,
  onRequestMatrixCellChange: PropTypes.func.isRequired,
  isIntroductionUIVisible: PropTypes.bool.isRequired,
  isCreateMatrixUIVisible: PropTypes.bool.isRequired,
  createMatrixColumnCount: PropTypes.number.isRequired,
  createMatrixRowCount: PropTypes.number.isRequired,
};

const stateToProps = state => ({
  matrix: getDetailedMatrix(state),
  solutions: getSolutions(state),
  activeSolution: getActiveSolution(state),
  previewSolution: getPreviewSolution(state),
  solutionPathsData: getSolutionPathsData(state),
  isCreateMatrixUIVisible: getIsCreateMatrixUIVisible(state),
  isIntroductionUIVisible: getIsIntroductionUIVisible(state),
  createMatrixColumnCount: getCreateMatrixColumnCount(state),
  createMatrixRowCount: getCreateMatrixRowCount(state),
});

const dispatchToProps = dispatch => ({
  onSolutionClicked: (solution) => { dispatch(setActiveSolution(solution)); },
  onNextSolutionClicked: () => { dispatch(setNextActiveSolution()); },
  onPreviousSolutionClicked: () => { dispatch(setPreviousActiveSolution()); },
  onSolutionHover: (solution) => { dispatch(setPreviewSolution(solution)); },
  onToggleCreateMatrixUI: () => { dispatch(toggleCreateMatrixUI()); },
  onToggleIntroductionUI: () => { dispatch(toggleIntroductionUI()); },
  onRequestRandomMatrix: (rowCount, columnCount) => { dispatch(requestRandomMatrix(rowCount, columnCount)); },
  onRequestMatrixCellChange: (index, value) => { dispatch(requestMatrixCellChange(index, value)); },
  onSetCreateMatrixColumnCount: (count) => { dispatch(setCreateMatrixColumnCount(count)); },
  onSetCreateMatrixRowCount: (count) => { dispatch(setCreateMatrixRowCount(count)); },
});
const Main = compose(
  connect(
    stateToProps,
    dispatchToProps
  ),
  PureImmutable()
)(Container);

export default Main;
