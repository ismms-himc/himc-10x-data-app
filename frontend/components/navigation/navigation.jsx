import React from 'react';
import { Link, hashHistory } from 'react-router';

const styles = {
  root: {
    marginTop: 30,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
};

const Navigation = function (props) {
  function redirectTo(url) {
    return function (e) {
      e.preventDefault();
      hashHistory.push(url);
    };
  }

  if (props.currentUser) {
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography type="title" color="inherit" className={styles.flex}>
            HIMC Single-Cell Sequencing
          </Typography>
          <Button color="contrast">Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  }
  else {
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography type="title" color="inherit" className={styles.flex}>
            HIMC Single-Cell Sequencing
          </Typography>
          <Button color="contrast">Log In</Button>
        </Toolbar>
      </AppBar>
    </div>
  }
};

export default withStyles(styles)(Navigation);
