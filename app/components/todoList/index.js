import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxOutline from
  'material-ui/svg-icons/toggle/check-box-outline-blank';
import Mood from 'material-ui/svg-icons/social/mood';
import viewTypes from 'config/viewTypes';
import TodoListModel from 'models/todoList';
import { toggleComplete } from 'actions';

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
        style={item.isCompleted() ? { textDecoration: 'line-through' } : {}}
        onClick={() => toggle(item.getId())}
      />
    ))}
  </List>
);

TodoList.propTypes = {
  toggle: PropTypes.func.isRequired,
  items: PropTypes.instanceOf(TodoListModel).isRequired,
  // Prop is used in mapStateToProps
  // view: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

const mapStateToProps = (state) => ({
  items: state.get('todos')
    .filter(viewTypes.find(({ id }) =>
      id === state.getIn(['data', 'view'])).filter),
});

const mapDispatchToProps = (dispatch) => ({
  toggle: (id) => dispatch(toggleComplete(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
