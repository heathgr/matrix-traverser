import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ContainerDimensions from 'react-container-dimensions';
import Matrix from '../components/Matrix';
import SolutionPaths from '../components/SolutionPaths';
import PureImmutable from '../helpers/hocs/PureImmutable';

const MatrixResizer = ({
  matrix,
  solutionPathsData,
  activeSolution,
  previewSolution,
  onSolutionClicked,
  onSolutionHover,
  onRequestMatrixCellChange,
}) => (
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
        const matrixBoxStyle = {
          width: matrixWidth,
          height: matrixHeight,
          position: 'relative',
        };

        return (<div style={matrixBoxStyle}>
          <SolutionPaths
            width={matrixWidth}
            height={matrixHeight}
            cellSize={cellSize}
            solutionPathsData={solutionPathsData}
            activeSolution={activeSolution}
            previewSolution={previewSolution}
            onSolutionClicked={onSolutionClicked}
            onSolutionHover={onSolutionHover}
          />
          <Matrix
            width={matrixWidth}
            height={matrixHeight}
            cellSize={cellSize}
            matrix={matrix}
            activeSolution={activeSolution}
            onRequestMatrixCellChange={onRequestMatrixCellChange}
          />
        </div>);
      }
    }
  </ContainerDimensions>
);

MatrixResizer.defaultProps = {
  previewSolution: null,
};

MatrixResizer.propTypes = {
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      value: PropTypes.number.isRequired,
      activePosition: PropTypes.number,
      previewPosition: PropTypes.number,
    })).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
  solutionPathsData: ImmutablePropTypes.listOf(
    ImmutablePropTypes.list
  ).isRequired,
  activeSolution: PropTypes.number.isRequired,
  previewSolution: PropTypes.number,
  onSolutionClicked: PropTypes.func.isRequired,
  onSolutionHover: PropTypes.func.isRequired,
  onRequestMatrixCellChange: PropTypes.func.isRequired,
};

export default PureImmutable()(MatrixResizer);
