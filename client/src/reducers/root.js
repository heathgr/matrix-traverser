/** @module reducers/root */
import { combineReducers } from 'redux';
import matrix from './matrix';
import solutions from './solutions';

const root = combineReducers({
  matrix,
  solutions,
});

/**
 * The root reducer for the app state.
 * @return {Object} The new app state.
 */
export default root;
