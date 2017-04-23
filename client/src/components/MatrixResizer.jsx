import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import ContainerDimensions from 'react-container-dimensions';
import Matrix from '../components/Matrix';
import SolutionPaths from '../components/SolutionPaths';

const MatrixResizer = ({ matrix, solutionPathsData }) => (
  <ContainerDimensions>
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

        return (<MatrixBox>
          <Matrix
            width={matrixWidth}
            height={matrixHeight}
            cellSize={cellSize}
            matrix={matrix}
          />
          <SolutionPaths
            width={matrixWidth}
            height={matrixHeight}
            cellSize={cellSize}
            solutionPathsData={solutionPathsData}
          />
        </MatrixBox>);
      }
    }
  </ContainerDimensions>
);

MatrixResizer.propTypes = {
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
  solutionPathsData: ImmutablePropTypes.listOf(
    ImmutablePropTypes.list
  ).isRequired,
};

export default MatrixResizer;
