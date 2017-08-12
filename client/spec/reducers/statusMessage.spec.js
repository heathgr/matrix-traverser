import { expect } from 'chai';
import { Map, is } from 'immutable';
import {
  requestSolutions,
  gotSolutions,
  failedToGetSolutions,
} from '../../src/actions/solutionsActions';
import statusMessage, {
  getStatusMessageType,
} from '../../src/reducers/statusMessage';
import {
  LOADING_MESSAGE,
  LOADED_MESSAGE,
  ERROR_MESSAGE,
} from '../../src/constants/statusMessageTypes';

describe('Status Message Reducer', () => {
  it('Should let non supported actions fall through.', () => {
    const testAction = { type: 'SOME_ACTION' };
    const testState = statusMessage(undefined, testAction);
    const expectedState = statusMessage(undefined, { type: '@@INIT' });

    expect(is(testState, expectedState)).to.equal(true);
  });

  it('Should correctly handle a REQUEST_SOLUTIONS action.', () => {
    const testAction = requestSolutions();
    const testState = statusMessage(undefined, testAction);
    const expectedState = Map({
      messageType: LOADING_MESSAGE,
    });

    expect(is(testState, expectedState)).to.equal(true);
  });

  it('Should correctly handle a GOT_SOLUTIONS action.', () => {
    const testAction = gotSolutions([
      [0, 1, 2],
      [0, 1, 3],
    ]);
    const testState = statusMessage(undefined, testAction);
    const expectedState = Map({
      messageType: LOADED_MESSAGE,
    });

    expect(is(testState, expectedState)).to.equal(true);
  });


  it('Should correctly handle a FAILED_TO_GET_SOLUTIONS action.', () => {
    const testAction = failedToGetSolutions('Something is broken!!!');
    const testState = statusMessage(undefined, testAction);
    const expectedState = Map({
      messageType: ERROR_MESSAGE,
    });

    expect(is(testState, expectedState)).to.equal(true);
  });

  it('Should have a getStatusMessage selector.', () => {
    const testState = Map({
      messageType: LOADING_MESSAGE,
    });

    expect(getStatusMessageType(testState)).to.equal(LOADING_MESSAGE);
  });
});
