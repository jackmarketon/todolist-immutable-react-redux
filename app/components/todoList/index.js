import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxOutline from
  'material-ui/svg-icons/toggle/check-box-outline-blank';
import Mood from 'material-ui/svg-icons/social/mood';
import viewTypes from 'config/viewTypes';
import { toggleComplete } from 'actions';

const TodoList = ({ items, toggle }) => (
  <List
    style={{ height: '500px' }}
  >
    {0 === items.length && (
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
    {items.map(({ id, isCompleted, text }) => (
      <ListItem
        key={id}
        primaryText={text}
        leftIcon={isCompleted ? <Checkbox /> : <CheckBoxOutline />}
        style={isCompleted ? { textDecoration: 'line-through' } : {}}
        onClick={() => toggle(id)}
      />
    ))}
  </List>
);

TodoList.propTypes = {
  toggle: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  // Prop is used in mapStateToProps
  // view: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};

const mapStateToProps = (state) => ({
  items: state.data.todos
    .filter(viewTypes.find(({ id }) => id === state.data.view).filter),
});

const mapDispatchToProps = (dispatch) => ({
  toggle: (id) => dispatch(toggleComplete(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
