import {
  RESET_DATA,
} from 'config/types';

export default function dataReducer(state = {}, { type = '' } = {}) {
  if (RESET_DATA === type) {
    return { ...state };
  }
  return state;
}
