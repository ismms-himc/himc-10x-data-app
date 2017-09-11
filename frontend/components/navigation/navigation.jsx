import React from 'react';
import { Link, hashHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    if (this.props.currentUser) {
      return(<AppBar
        title={<span>HIMC Single-Cell Sequencing</span>}
        iconElementLeft={<p></p>}
        iconElementRight={<FlatButton label="Log Out" />}
        />);
    } else {
      return(<AppBar
        title={<span>HIMC Single-Cell Sequencing</span>}
        iconElementLeft={<p></p>}
        iconElementRight={<FlatButton label="Log In" />}
        />);
    }
  }
}

function getChildContext() {
  return { muiTheme: getMuiTheme(baseTheme) };
}

Navigation.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
