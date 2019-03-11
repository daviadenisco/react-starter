import { createMuiTheme } from '@material-ui/core/styles';
import palette from './theme.palette';

const theme = {
  palette: {
    ...palette,
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif', 'IBM Plex'].join(
      ','
    ),
  },
};

export default createMuiTheme(theme);
