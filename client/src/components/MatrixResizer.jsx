import React from 'react';
import glamorous from 'glamorous';
import ContainerDimensions from 'react-container-dimensions';
import Matrix from '../components/Matrix';
import SolutionPaths from '../components/SolutionPaths';

const MatrixResizer = ({ matrix, solutionPathsData }) => {
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
  </ContainerDimensions>);
};

export default MatrixResizer;

/*
const MatrixBox = glamorous.div({
  width: matrixWidth,
  height: matrixHeight,
  background: 'palegoldenrod',
  position: 'relative',
  flex: 1,
});



*/
