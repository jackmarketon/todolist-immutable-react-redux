import { createSelector } from 'reselect';
import viewTypes from 'config/viewTypes';
import { viewSelector } from 'selectors/dataSelectors';

export const todoListSelector = (state) => state.get('todos');

const viewFilter = createSelector(
  viewSelector,
  (view) => {
    const activeView = viewTypes.find(({ id }) => id === view);
    if (activeView && activeView.filter) {
      return activeView.filter;
    }
    return () => {};
  }
);

export const viewFilteredTodoListSelector = createSelector(
  todoListSelector,
  viewFilter,
  (todos, filter) => todos.filter(filter)
);
