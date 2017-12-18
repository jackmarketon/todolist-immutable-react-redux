export default [
  {
    id: 'all',
    filter: () => true,
    label: 'All',
  }, {
    id: 'completed',
    label: 'Completed',
    filter: (item) => item.get('isCompleted'),
  }, {
    id: 'notCompleted',
    label: 'Not Completed',
    filter: (item) => !item.get('isCompleted'),
  },
];
