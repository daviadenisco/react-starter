import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import NavBar from '../../components/NavBar';
import Engagements from './Engagements';

function EngagementsView(props) {
  const { classes } = props;
  return (
    <div className={classes.app}>
      <NavBar />
      <Engagements />
    </div>
  );
}

export default withStyles(styles)(EngagementsView);
