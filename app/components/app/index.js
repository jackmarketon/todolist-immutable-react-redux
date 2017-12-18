import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash/fp';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TodoList from 'components/todoList';
import Form from 'components/form';
import ViewToolbar from 'components/viewToolbar';
import { clearTodos } from 'actions';

const App = ({ clear }) => (
  <Fragment>
    <AppBar
      title="ToDo List"
      showMenuIconButton={false}
      iconElementRight={<FlatButton label="Clear" onClick={() => clear()} />}
    />
    <Form />
    <TodoList />
    <ViewToolbar />
  </Fragment>
);

App.propTypes = {
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(clearTodos()),
});

export default connect(noop(), mapDispatchToProps)(App);
