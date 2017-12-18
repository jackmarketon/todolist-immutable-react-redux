import uuid from 'uuid/v1';
import {
  ADD_TODO,
  REMOVE_TODO,
  CLEAR_TODOS,
  TOGGLE_COMPLETE,
} from 'config/types';
import Todo from 'models/todo';
import TodoList from 'models/todoList';

const initialState = new TodoList();

export default (state = initialState, { type, ...payload }) => {
  switch (type) {
    case ADD_TODO:
      return state.push(new Todo({ ...payload, id: uuid() }));
    case REMOVE_TODO:
      return state.filter(({ id }) => id !== payload.id);
    case CLEAR_TODOS:
      return initialState;
    case TOGGLE_COMPLETE: {
      return state.update((todos) => todos.map((todo) => (
        todo.getId() === payload.id ? todo.toggleCompleted() : todo)));
    }
    default:
      return state;
  }
};
