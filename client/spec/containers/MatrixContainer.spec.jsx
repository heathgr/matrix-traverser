import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';

import MatrixContainer from '../../src/containers/MatrixContainer';
import Matrix from '../../src/components/Matrix';
import SolutionPaths from '../../src/components/SolutionPaths';
import SolutionsList from '../../src/components/SolutionsList';
import { initialSolutions } from '../../src/reducers/solutions';
import { testMatrix } from '../testData/testMatrixData';

const testStore = createStore(
  () => ({
    matrix: testMatrix,
    solutions: initialSolutions,
  })
);

describe('<MatrixContainer />', () => {
  chai.use(chaiEnzyme());

  const componentWrapper = mount(
    <Provider store={testStore}>
      <MatrixContainer />
    </Provider>
  );

  it('Should render a <Matrix /> component with the matrix state and solutions state passed as a props.', () => {
    expect(componentWrapper).to.contain(
      <Matrix width={0} height={0} cellSize={0} matrix={testMatrix} />
    );
  });

  it('Should render a <SolutionPaths /> component with correct props passed from the app state.', () => {
    const solutionPathsWrapper = componentWrapper.find(SolutionPaths);

    expect(componentWrapper).to.have.exactly(1).descendants(SolutionPaths);
    expect(solutionPathsWrapper).to.have.prop('width');
    expect(solutionPathsWrapper).to.have.prop('height');
    expect(solutionPathsWrapper).to.have.prop('cellSize');
    expect(solutionPathsWrapper).to.have.prop('solutionPathsData');
    expect(solutionPathsWrapper).to.have.prop('activeSolution');
    expect(solutionPathsWrapper).to.have.prop('onSolutionClicked');
    expect(solutionPathsWrapper).to.have.prop('onSolutionHover');
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
