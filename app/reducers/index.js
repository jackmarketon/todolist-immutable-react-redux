/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers would not be hot-reloadable
 */

import { combineReducers } from 'redux-immutable';
import data from './data';
import todos from './todos';

const combined = combineReducers({ data, todos });

// export default reduceReducer(combined);
export default combined;
