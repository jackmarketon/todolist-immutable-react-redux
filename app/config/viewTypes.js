export default [
  {
    id: 'all',
    filter: () => true,
    label: 'All',
  }, {
    id: 'completed',
    label: 'Completed',
    filter: ({ isCompleted }) => isCompleted,
  }, {
    id: 'notCompleted',
    label: 'Not Completed',
    filter: ({ isCompleted }) => !isCompleted,
  },
];
