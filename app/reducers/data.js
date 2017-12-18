import uuid from 'uuid/v1';
import {
  RESET_DATA,
  ADD_TODO,
  REMOVE_TODO,
  CLEAR_TODOS,
  CHANGE_VIEW,
  TOGGLE_COMPLETE,
} from 'config/types';

export default function dataReducer(
  state = {},
  { type = '', ...payload } = {}
) {
  switch (type) {
    case RESET_DATA:
      return { ...state };
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat({
          text: payload.text,
          isCompleted: false,
          id: uuid(),
        }),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(({ id }) => id !== payload.id),
      };
    case CLEAR_TODOS:
      return {
        ...state,
        todos: [],
      };
    case CHANGE_VIEW:
      return {
        ...state,
        view: payload.view,
      };
    case TOGGLE_COMPLETE:
      return {
        ...state,
        todos: state.todos.map(({ id, isCompleted, ...rest }) => ({
          ...rest,
          id,
          isCompleted: (id === payload.id) ? !isCompleted : isCompleted,
        })),
      };
    default:
      return state;
  }
}
