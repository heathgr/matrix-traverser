import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';

import root from '../../src/reducers/root';
import Main from '../../src/containers/Main';
import MatrixResizer from '../../src/components/MatrixResizer';
import SolutionsList from '../../src/components/SolutionsList';
import { initialSolutions } from '../../src/reducers/solutions';
import { testMatrix } from '../testData/testMatrixData';

const testStore = createStore(root);

describe('<Main />', () => {
  chai.use(chaiEnzyme());

  const componentWrapper = mount(
    <Provider store={testStore}>
      <Main />
    </Provider>
  );

  it('Should render a <MatrixResizer /> component with the matrix state and solutions state passed as a props.', () => {
    const matrixResizerWrapper = componentWrapper.find(MatrixResizer);

    expect(componentWrapper).to.have.exactly(1).descendants(MatrixResizer);
    expect(matrixResizerWrapper).to.have.prop('matrix');
    expect(matrixResizerWrapper).to.have.prop('solutionPathsData');
    expect(matrixResizerWrapper).to.have.prop('activeSolution');
    expect(matrixResizerWrapper).to.have.prop('previewSolution');
    expect(matrixResizerWrapper).to.have.prop('onSolutionClicked');
    expect(matrixResizerWrapper).to.have.prop('onSolutionClicked');
  });

  it('Should render a <SolutionsList /> component with correct props passed from the app state.', () => {
    const solutionsListWrapper = componentWrapper.find(SolutionsList);

    expect(componentWrapper).to.have.exactly(1).descendants(SolutionsList);
    expect(solutionsListWrapper).to.have.prop('solutions');
    expect(solutionsListWrapper).to.have.prop('activeSolution');
    expect(solutionsListWrapper).to.have.prop('onSolutionClicked');
    expect(solutionsListWrapper).to.have.prop('onNextSolutionClicked');
    expect(solutionsListWrapper).to.have.prop('onPreviousSolutionClicked');
    expect(solutionsListWrapper).to.have.prop('onSolutionHover');
  });
});
