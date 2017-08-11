import { expect } from 'chai';
import { Map, is } from 'immutable';
import {
  requestSolutions,
  gotSolutions,
  failedToGetSolutions,
} from '../../src/actions/solutionsActions';
import statusMessage, {
  getStatusMessage,
  createLoadingMessage,
  createLoadedMessage,
  createFailedMessage,
} from '../../src/reducers/statusMessage';

describe('Status Message Reducer', () => {
  it('Should let non supported actions fall through.', () => {
    const testAction = { type: 'SOME_ACTION' };
    const testState = statusMessage(undefined, testAction);
    const expectedState = statusMessage(undefined, { type: '@@INIT'});

    expect(is(testState, expectedState)).to.equal(true);
  });

  it('Should correctly handle a REQUEST_SOLUTIONS action.', () => {
    const testAction = requestSolutions();
    const testState = statusMessage(undefined, testAction);
    const expectedState = Map({
      statusMessage: createLoadingMessage(),
    });

    expect(is(testState, expectedState)).to.equal(true);
  });

  it('Should correctly handle a REQUEST_SOLUTIONS action.', () => {
    const testAction = gotSolutions(
      [
        [4, 5, 8, 11],
        [4, 5, 9, 11],
        [4, 5, 10, 11],
      ]
    );
    const testState = statusMessage(undefined, testAction);
    const expectedState = Map({
      statusMessage: createLoadedMessage(3, 4),
    });

    expect(is(testState, expectedState)).to.equal(true);
  });

  it('Should correctly handle a FAILED_TO_GET_SOLUTIONS action.', () => {
    const error = 'Something is broken!!!';
    const testAction = failedToGetSolutions(error);
    const testState = statusMessage(undefined, testAction);
    const expectedState = Map({
      statusMessage: createFailedMessage(error),
    });

    expect(is(testState, expectedState)).to.equal(true);
  });

  it('Should have a getStatusMessage selector.', () => {
    const message = 'Some Message';
    const testState = Map({
      statusMessage: message,
    });

    expect(getStatusMessage(testState)).to.equal(message);
  });
});
