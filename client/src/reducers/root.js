// import { SOME_ACTION } from '../constants/actionTypes';
import { Map, List } from 'immutable';

const initialState = Map({
  matrix: Map({
    cells: List([0, 6, 2, 1, 9, 2]),
    columnCount: 2,
  }),
});

const root = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default root;
