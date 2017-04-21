import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getMatrix, getSolutionPathsData, getSolutions } from '../reducers/root';
import MatrixResizer from '../components/MatrixResizer';
import SolutionsList from '../components/SolutionsList';
import PureImmutable from '../helpers/hocs/PureImmutable';

const Container = ({ matrix, solutionPathsData }) => {
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
        <MatrixResizer matrix={matrix} solutionPathsData={solutionPathsData} />
      </MatrixWrapper>
      <SolutionsList />
    </FlexFullWidthHeight>
  );
};

Container.propTypes = {
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
  solutionPathsData: ImmutablePropTypes.listOf(
    ImmutablePropTypes.list,
  ).isRequired,
};

const stateToProps = state => ({
  matrix: getMatrix(state),
  solutions: getSolutions(state),
  solutionPathsData: getSolutionPathsData(state),
});

const MatrixContainer = compose(connect(stateToProps), PureImmutable())(Container);

export default MatrixContainer;
