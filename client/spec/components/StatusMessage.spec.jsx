import React from 'react';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { List } from 'immutable';
import {
  LOADING_MESSAGE,
  LOADED_MESSAGE,
  ERROR_MESSAGE,
} from '../../src/constants/statusMessageTypes';
import StatusMessage from '../../src/components/StatusMessage';

describe('<StatusMessage />', () => {
  chai.use(chaiEnzyme());

  const testWrapper = mount(<StatusMessage
    messageType={LOADING_MESSAGE}
    solutions={null}
    error={null}
  />);

  it('Should display a loading message.', () => {
    expect(testWrapper.contains(<div>Loading</div>)).to.equal(true);
  });

  it('Should display a loaded message.', () => {
    testWrapper.setProps({
      messageType: LOADED_MESSAGE,
      solutions: List([
        List([1, 3, 7]),
        List([1, 3, 9]),
      ]),
    });

    expect(testWrapper.contains(<div>Found 2 solutions with a length of 3.</div>)).to.equal(true);
  });

  it('Should display an error message.', () => {
    testWrapper.setProps({
      messageType: ERROR_MESSAGE,
      error: 'It is broken.',
    });

    expect(testWrapper.contains(<div>It is broken.</div>)).to.equal(true);
  });
});
