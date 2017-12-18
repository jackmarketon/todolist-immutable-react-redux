import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash/fp';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Add from 'material-ui/svg-icons/content/add';
import { addTodo } from 'actions';

/**
 * Simple validation function
 * @param text validation field
 * @returns {{text: boolean}}
 */
function validate(text) {
  return {
    text: 0 < text.length,
  };
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      touched: {
        text: false,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ text: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (0 < this.state.text.length) {
      this.props.onSubmit(this.state.text);
      this.setState({
        text: '',
        touched: {
          text: false,
        },
      });
    }
  }

  render() {
    const errors = validate(this.state.text);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    const { text } = this.state;

    return (
      <Toolbar>
        <form
          style={{ width: '100%' }}
          onSubmit={this.handleSubmit}
        >
          <ToolbarGroup>
            <TextField
              hintText="Enter New ToDo"
              errorText={shouldMarkError('text') &&
                'Error please enter text'}
              onChange={this.handleChange}
              value={text}
              style={{
                width: '100%',
              }}
            />
            <RaisedButton
              primary
              disabled={0 === text.length}
              icon={<Add />}
              type="submit"
              value="Submit"
            />
          </ToolbarGroup>
        </form>
      </Toolbar>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (evt) => {
    dispatch(addTodo(evt));
  },
});

export default connect(noop(), mapDispatchToProps)(Form);
