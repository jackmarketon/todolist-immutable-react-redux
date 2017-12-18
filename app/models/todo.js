import Immutable from 'immutable';

const TodoRecord = Immutable.Record({
  id: null,
  isCompleted: false,
  text: '',
}, 'Todo');

class Todo extends TodoRecord {
  isCompleted() {
    return this.get('isCompleted');
  }

  toggleCompleted() {
    return this.set('isCompleted', !this.isCompleted());
  }

  getText() {
    return this.get('text');
  }

  getId() {
    return this.get('id');
  }
}

export default Todo;
