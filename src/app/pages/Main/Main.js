import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import NavBar from '../../components/NavBar';

function Main(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <NavBar />
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
