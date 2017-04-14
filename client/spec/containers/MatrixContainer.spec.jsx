import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';

import MatrixContainer from '../../src/containers/MatrixContainer';
import Matrix from '../../src/components/Matrix';
import { testMatrix } from '../testData/testMatrixData';

const testStore = createStore(
  () => ({ matrix: testMatrix })
);

describe('<MatrixContainer />', () => {
  chai.use(chaiEnzyme());

  it('Should render a Matrix component with the matrix state passed as a prop.', () => {
    const componentWrapper = mount(
      <Provider store={testStore}>
        <MatrixContainer />
      </Provider>
    );

    expect(componentWrapper).to.contain(<Matrix width={0} height={0} cellSize={0} matrix={testMatrix} />);
  });
});
