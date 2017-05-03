import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { Component } from 'react';
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

const FlexFullWidthHeight = ({ children }) => (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    {
      children
    }
  </div>
);

class Container extends Component {

  componentDidMount() {
    console.log('matrix container did mount...');
  }

  render() {
    const {
      matrix,
      solutions,
      activeSolution,
      previewSolution,
      solutionPathsData,
      onSolutionClicked,
      onNextSolutionClicked,
      onPreviousSolutionClicked,
      onSolutionHover,
    } = this.props;

    const matrixWrapperStyle = {
      display: 'flex',
      background: 'aqua',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    };

    return (
      <FlexFullWidthHeight>
        <div style={matrixWrapperStyle}>
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
          }}
        />
      </FlexFullWidthHeight>
    );
  }
}

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