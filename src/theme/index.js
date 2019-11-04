import { createMuiTheme } from '@material-ui/core/styles';
import palette from './theme.palette';
import button from './theme.button';
import spacing from './theme.spacing';
import typography from './theme.typography';

const theme = {
  palette: {
    ...palette,
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif', 'IBM Plex'].join(
      ','
    ),
    useNextVariants: true,
  },
  spacing: {
    ...spacing,
  },
  overrides: {
    MuiButton: {
      ...button,
    },
    MuiTypography: {
      ...typography,
    },
  },
};

export default createMuiTheme(theme);
