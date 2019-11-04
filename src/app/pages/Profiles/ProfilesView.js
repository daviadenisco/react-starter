import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import NavBar from '../../components/NavBar';
import Profiles from './Profiles';

function ProfilesView(props) {
  const { classes } = props;
  return (
    <div className={classes.app}>
      <NavBar />
      <Profiles />
    </div>
  );
}

export default withStyles(styles)(ProfilesView);
