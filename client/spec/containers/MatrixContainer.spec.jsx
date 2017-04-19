import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';

import MatrixContainer from '../../src/containers/MatrixContainer';
import Matrix from '../../src/components/Matrix';
import SolutionPaths from '../../src/components/SolutionPaths';
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
    expect(componentWrapper).to.contain(
      <SolutionPaths width={0} height={0} cellSize={0} solutionPathsData={initialSolutions} />
    );
  });
});
