import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuListComposition from '../MenuListComposition/MenuListComposition';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon>
              <MenuListComposition />
            </MenuIcon>
          </IconButton>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Link
              style={{
                color: 'white',
                paddingLeft: '600px',
                paddingRight: '40px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '22px',
              }}
              to="/engagements"
            >
              ENGAGEMENTS
            </Link>
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '22px',
              }}
              to="/profiles"
            >
              PROFILES
            </Link>
          </div>
          <Button color="inherit">
            <a
              href="/unauth"
              className={classes.menuButton}
              className={classes.grow}
              style={{
                color: 'white',
                paddingLeft: '550px',
                textDecoration: 'none',
              }}
            >
              Sign Out
            </a>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
