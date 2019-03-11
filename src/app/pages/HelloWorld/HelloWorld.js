import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import logo from '../../../logo.svg';

function HelloWorld(props) {
  const { classes } = props;
  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <img src={logo} className={classes.appLogo} alt="logo" />
        <p>
          Edit
          <code> src/App.js </code>
          and save to reload.
        </p>
        <a
          className={classes.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          data-test="app-link"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withStyles(styles)(HelloWorld);
