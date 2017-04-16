import glamorous from 'glamorous';
import ContainerDimensions from 'react-container-dimensions';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getMatrix, getSolutions } from '../reducers/root';
import Matrix from '../components/Matrix';

const Container = ({ matrix }) => {
  const MatrixWrapper = glamorous.div({
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

        return (<MatrixWrapper>
          <Matrix width={columnCount * cellSize} height={rowCount * cellSize} cellSize={cellSize} matrix={matrix} />
        </MatrixWrapper>);
      }
    }
  </ContainerDimensions>);
};

Container.propTypes = {
  matrix: ImmutablePropTypes.mapContains({
    cells: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
    columnCount: PropTypes.number.isRequired,
  }).isRequired,
};

const stateToProps = state => ({
  matrix: getMatrix(state),
  // solutions: getSolutions(state),
});

const MatrixContainer = connect(stateToProps)(Container);

export default MatrixContainer;
