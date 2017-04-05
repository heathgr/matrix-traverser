import chai, { expect } from 'chai';
import { spy } from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
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

/*
import chai, { expect } from 'chai';
import { spy } from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';

import SomeComponent from '../../src/components/SomeComponent';
import actionTypes from '../../src/constants/actionTypes';

describe('<SomeComponent />', () => {
  chai.use(chaiEnzyme());

  it('should have a div', () => {
    const componentWrapper = shallow(<SomeComponent />);

    expect(componentWrapper).to.contain(<div />);
  });

  it('should have a button that calls a function', () => {
    const someFunction = spy();
    const appWrapper = shallow(<SomeComponent someFunction={someFunction} />);

    appWrapper.find('button').simulate('click');
    expect(someFunction.calledOnce).to.equal(true);
  });
});
*/
