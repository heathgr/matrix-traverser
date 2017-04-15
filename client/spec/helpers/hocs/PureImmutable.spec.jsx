import chai, { expect } from 'chai';
import { spy } from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';

import Pure from '../../../src/helpers/hocs/PureImmutable';

const deepProps1 = Map({
  one: Map({ number: 1 }),
  two: Map({ number: 2 }),
  three: Map({ number: 3 }),
});
const deepProps2 = Map({
  one: Map({ number: 1 }),
  two: Map({ number: 2 }),
  three: Map({ number: 4 }),
});
const deepProps3 = Map({
  one: Map({ number: 1 }),
  two: Map({ number: 2 }),
  three: Map({ number: 4 }),
});

const TestComponent = (props) => {
  const [one, two, three] = props.numbers.values();

  return (<div>{`one: ${one.get('number')} two: ${two.get('number')} three: ${three.get('number')}`}</div>);
};

const TestComposedComponent = Pure()(TestComponent);

TestComponent.propTypes = {
  numbers: ImmutablePropTypes.mapContains({
    one: ImmutablePropTypes.mapContains({ number: PropTypes.number.isRequired }).isRequired,
    two: ImmutablePropTypes.mapContains({ number: PropTypes.number.isRequired }).isRequired,
    three: ImmutablePropTypes.mapContains({ number: PropTypes.number.isRequired }).isRequired,
  }).isRequired,
};

describe('The Pure render higher order component.', () => {
  chai.use(chaiEnzyme());

  it('Should compose the provided component and return a PureComponent.', () => {
    const testWrapper = mount(<TestComposedComponent numbers={deepProps1} />);

    expect(testWrapper).to.contain(<div>one: 1 two: 2 three: 3</div>);
  });
  it('Should only call the render function if its props have changed.', () => {
    const TestComposed = Pure()(TestComponent);
    const renderSpy = spy(TestComposed.prototype, 'render');
    const composedWrapper = mount(<TestComposed numbers={deepProps1} />);

    composedWrapper.setProps({ numbers: deepProps1 });
    composedWrapper.setProps({ numbers: deepProps2 });
    composedWrapper.setProps({ numbers: deepProps3 }); // deepProps3 has the same values as deepProps2
    expect(renderSpy.calledTwice).to.equal(true);
  });
});
