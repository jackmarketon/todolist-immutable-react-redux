import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxOutline from
  'material-ui/svg-icons/toggle/check-box-outline-blank';
import Mood from 'material-ui/svg-icons/social/mood';
import TodoListModel from 'models/todoList';
import { toggleComplete } from 'actions';
import { viewFilteredTodoListSelector } from 'selectors/todoListSelectors';

const TodoList = ({ items, toggle }) => (
  <List
    style={{ height: '500px' }}
  >
    {0 === items.size && (
      <ListItem
        primaryText="No Todos"
        leftIcon={<Mood />}
        disabled
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '16px',
        }}
      />
    )}
    {items.map((item) => (
      <ListItem
        key={item.getId()}
        primaryText={item.getText()}
        leftIcon={item.isCompleted() ? <Checkbox /> : <CheckBoxOutline />}
        style={item.isCompleted() ?
          { textDecoration: 'line-through' } : {}}
        onClick={() => toggle(item.getId())}
      />
    ))}
  </List>
);

TodoList.propTypes = {
  toggle: PropTypes.func.isRequired,
  items: PropTypes.instanceOf(TodoListModel).isRequired,
};

const mapStateToProps = (state) => ({
  items: viewFilteredTodoListSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggle: (id) => dispatch(toggleComplete(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
