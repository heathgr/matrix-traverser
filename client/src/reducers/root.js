// import { SOME_ACTION } from '../constants/actionTypes';
import { Map, fromJS } from 'immutable';

const initialState = fromJS({
  matrix: {
    cells: [3, 9, 5, 7],
    columnCount: 2,
  },
});

const root = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default root;
