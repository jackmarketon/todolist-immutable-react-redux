import { createSelector } from 'reselect';

export const dataSelector = (state) => state.get('data');
export const viewSelector = createSelector(
  dataSelector,
  (data) => data.get('view', 'all')
);
