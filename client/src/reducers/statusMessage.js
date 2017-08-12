import { Map } from 'immutable';

import {
  REQUEST_SOLUTIONS,
  GOT_SOLUTIONS,
  FAILED_TO_GET_SOLUTIONS,
} from '../constants/actionTypes';
import {
  LOADING_MESSAGE,
  LOADED_MESSAGE,
  ERROR_MESSAGE,
} from '../constants/statusMessageTypes';

export const initialStatusMessageState = Map({
  messageType: LOADING_MESSAGE,
});

const statusMessage = (state = initialStatusMessageState, action) => {
  switch (action.type) {
    case REQUEST_SOLUTIONS: {
      return state.set('messageType', LOADING_MESSAGE);
    }
    case GOT_SOLUTIONS: {
      return state.set('messageType', LOADED_MESSAGE);
    }
    case FAILED_TO_GET_SOLUTIONS: {
      return state.set('messageType', ERROR_MESSAGE);
    }
    default: {
      return state;
    }
  }
};

export const getStatusMessageType = state => state.get('messageType');

export default statusMessage;
