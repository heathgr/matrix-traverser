import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';

import MatrixContainer from '../../src/containers/MatrixContainer';
import MatrixCell from '../../src/components/MatrixCell';
import { testMatrix } from '../testData/testMatrixData';

const testStore = createStore(
  () => ({ matrix: testMatrix })
);

describe('<MatrixContainer />', () => {
  // chai.use(chaiEnzyme());

  it('Should contain the correct number of matrix cell objects', () => {
    const componentWrapper = mount(
      <Provider store={testStore}>
        <MatrixContainer />
      </Provider>
    );

    testMatrix.get('cells').map(
      cell => expect(componentWrapper.contains(<MatrixCell cell={cell} />)).to.equal(true)
    );
  });
});
