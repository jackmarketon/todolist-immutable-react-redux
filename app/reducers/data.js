import {
  CHANGE_VIEW,
} from 'config/types';

export default function dataReducer(
  state = {},
  { type = '', ...payload } = {}
) {
  switch (type) {
    case CHANGE_VIEW:
      return state.set('view', payload.view);
    default:
      return state;
  }
}
