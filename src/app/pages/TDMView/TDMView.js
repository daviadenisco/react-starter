import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import NavBar from '../../components/NavBar';
import Main from '../Main';

function TDMView(props) {
  const { classes } = props;
  return (
    <div className={classes.app}>
      <Main />
    </div>
  );
}

export default withStyles(styles)(TDMView);
