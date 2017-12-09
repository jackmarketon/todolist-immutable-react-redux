/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers would not be hot-reloadable
 */

import { combineReducers } from 'redux';
import data from './data';

const combined = combineReducers({ data });

// export default reduceReducer(combined);
export default combined;
