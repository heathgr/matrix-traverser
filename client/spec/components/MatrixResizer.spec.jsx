import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import { List, Map } from 'immutable';
import ContainerDimensions from 'react-container-dimensions';
import Matrix from '../../src/components/Matrix';
import MatrixResizer from '../../src/components/MatrixResizer';
import SolutionPaths from '../../src/components/SolutionPaths';

describe('<MatrixResizer />', () => {
  chai.use(chaiEnzyme());

  const testMatrix = Map({
    cells: List([
      Map({
        id: 0,
        value: 0,
        activePosition: 0,
        previewPosition: 0,
      }),
      Map({
        id: 1,
        value: 3,
        activePosition: 0,
        previewPosition: 0,
      }),
      Map({
        id: 2,
        value: 9,
        activePosition: 0,
        previewPosition: 0,
      }),
      Map({
        id: 3,
        value: 10,
        activePosition: 0,
        previewPosition: 0,
      }),
      Map({
        id: 4,
        value: 2,
        activePosition: 0,
        previewPosition: 0,
      }),
      Map({
        id: 5,
        value: 8,
        activePosition: 0,
        previewPosition: 0,
      }),
    ]),
    columnCount: 2,
    rowCount: 3,
  });
  const testSolutionPathData = List([]);

  const componentWrapper = mount(
    <MatrixResizer
      matrix={testMatrix}
      solutionPathsData={testSolutionPathData}
      activeSolution={0}
      onSolutionClicked={() => null}
      onSolutionHover={() => null}
      onSetMatrixCell={() => null}
      onRequestMatrixCellChange={() => null}
    />
  );
  const dimensionsWrapper = componentWrapper.find(ContainerDimensions);

  it('Should be wrapped by a <ContainerDimensions /> component.', () => {
    expect(componentWrapper).to.have.exactly(1).descendants(ContainerDimensions);
  });

  it('Should render a <SolutionPaths /> component.', () => {
    expect(dimensionsWrapper).to.have.exactly(1).descendants(SolutionPaths);
  });

  it('Should render a <Matrix /> component.', () => {
    expect(dimensionsWrapper).to.have.exactly(1).descendants(Matrix);
  });
});
