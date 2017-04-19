import glamorous from 'glamorous';
import ContainerDimensions from 'react-container-dimensions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getMatrix, getSolutionPathsData } from '../reducers/root';
import Matrix from '../components/Matrix';
import SolutionPaths from '../components/SolutionPaths';
import PureImmutable from '../helpers/hocs/PureImmutable';

const Container = ({ matrix, solutionPathsData }) => {
  const FlexFullWidthHeight = glamorous.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (<ContainerDimensions>
    {
      ({ width, height }) => {
        const rowCount = matrix.get('rowCount');
        const columnCount = matrix.get('columnCount');
        const cellSize = Math.min(
          height / rowCount,
          width / columnCount
        );
        const matrixWidth = columnCount * cellSize;
        const matrixHeight = rowCount * cellSize;
        const MatrixBox = glamorous.div({
          width: matrixWidth,
          height: matrixHeight,
          background: 'palegoldenrod',
          position: 'relative',
        });

        return (<FlexFullWidthHeight>
          <MatrixBox>
            <SolutionPaths
              width={matrixWidth}
              height={matrixHeight}
              cellSize={cellSize}
              solutionPathsData={solutionPathsData}
            />
            <Matrix
              width={matrixWidth}
              height={matrixHeight}
              cellSize={cellSize}
              matrix={matrix}
            />
          </MatrixBox>
        </FlexFullWidthHeight>);
      }
    }
  </ContainerDimensions>);
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
  solutionPathsData: getSolutionPathsData(state),
});

const MatrixContainer = compose(connect(stateToProps), PureImmutable())(Container);

export default MatrixContainer;
