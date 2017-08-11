import { Map } from 'immutable';

import {
  REQUEST_SOLUTIONS,
  GOT_SOLUTIONS,
  FAILED_TO_GET_SOLUTIONS,
} from '../constants/actionTypes';

const initialState = Map({
  statusMessage: '',
});

export const createLoadingMessage = () => 'Loading...';
export const createLoadedMessage = (solutionCount, solutionLength) => `Found ${solutionCount} solution${solutionCount > 1 ? 's' : ''} with a length of ${solutionLength}`;
export const createFailedMessage = error => `Error: ${error}`;

const statusMessage = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SOLUTIONS: {
      return state.set('statusMessage', createLoadingMessage());
    }
    case GOT_SOLUTIONS: {
      return state.set('statusMessage', createLoadedMessage(action.solutions.length, action.solutions[0].length));
    }
    case FAILED_TO_GET_SOLUTIONS: {
      return state.set('statusMessage', createFailedMessage(action.error));
    }
    default: {
      return state;
    }
  }
};

export const getStatusMessage = state => state.get('statusMessage');

export default statusMessage;
