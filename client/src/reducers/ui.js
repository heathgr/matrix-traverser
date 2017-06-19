import { Map } from 'immutable';
import {
  TOGGLE_CREATE_MATRIX_UI,
  TOGGLE_INTRODUCTION_UI,
} from '../constants/actionTypes';

const initialState = Map({
  isCreateMatrixUIVisible: false,
  isIntroductionUIVisible: false,
});

const ui = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CREATE_MATRIX_UI: {
      return state.set('isCreateMatrixUIVisible', !state.get('isCreateMatrixUIVisible'));
    }
    case TOGGLE_INTRODUCTION_UI: {
      return state.set('isIntroductionUIVisible', !state.get('isIntroductionUIVisible'));
    }
    default: {
      return state;
    }
  }
};

export const getIsCreateMatrixUIVisible = state => state.get('isCreateMatrixUIVisible');
export const getIsIntroductionUIVisible = state => state.get('isIntroductionUIVisible');

export default ui;
