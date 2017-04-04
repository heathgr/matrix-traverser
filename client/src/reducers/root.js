/** @module reducers/root */
import { Map, List } from 'immutable';

/**
 * Generates the initial app state.
 * @return {object}
 */
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

/**
 * The root reducer for the app state.
 * @param {object} state - Optional, the app state.
 * @param {object} action - The action that will be performed on the app state.
 * @return {{module:redux.Store}} The new app state.
 */
export default root;
