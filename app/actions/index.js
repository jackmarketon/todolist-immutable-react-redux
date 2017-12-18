import {
  RESET_DATA,
  ADD_TODO,
  REMOVE_TODO,
  CLEAR_TODOS,
  CHANGE_VIEW,
  TOGGLE_COMPLETE,
} from 'config/types';

/**
 * Action Generator
 * @param type          type of action
 * @param argNames      names of arguments
 * @returns {Function}  action function
 */
function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };
    argNames.forEach((arg, idx) => {
      action[argNames[idx]] = args[idx];
    });
    return action;
  };
}

export const resetData = makeActionCreator(RESET_DATA);
export const addTodo = makeActionCreator(ADD_TODO, 'text');
export const removeTodo = makeActionCreator(REMOVE_TODO, 'id');
export const clearTodos = makeActionCreator(CLEAR_TODOS);
export const changeView = makeActionCreator(CHANGE_VIEW, 'view');
export const toggleComplete = makeActionCreator(TOGGLE_COMPLETE, 'id');
