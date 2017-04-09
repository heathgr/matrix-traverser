import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';

import Main from '../../src/components/Main';
import MatrixContainer from '../../src/containers/MatrixContainer';

describe('<Main />', () => {
  chai.use(chaiEnzyme());

  it('should contain a MatrixContainer component', () => {
    const componentWrapper = shallow(<Main />);

    expect(componentWrapper).to.contain(<MatrixContainer />);
  });
});
