import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeView } from 'actions';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import viewTypes from 'config/viewTypes';

const ViewToolbar = ({ view, changeView: change }) => (
  <Toolbar>
    <ToolbarGroup style={{ width: '100%' }}>
      {viewTypes.map(({ id, label }) => (
        <RaisedButton
          key={id}
          onClick={() => change(id)}
          label={label}
          disabled={view === id}
        />
      ))}
    </ToolbarGroup>
  </Toolbar>
);

ViewToolbar.propTypes = {
  view: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  view: state.get('data').get('view'),
});

const mapDispatchToProps = (dispatch) => ({
  changeView: (view) => dispatch(changeView(view)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewToolbar);
