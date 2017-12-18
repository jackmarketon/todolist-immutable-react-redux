export default (store) => {
  if (!window.localStorage) {
    return;
  }
  if (0 === store.get('todos').size) {
    localStorage.removeItem('todos');
    return;
  }
  localStorage.setItem('todos', JSON.stringify(store.toJS()));
};
