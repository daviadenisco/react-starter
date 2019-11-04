/* eslint-disable react/no-multi-comp */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

let counter = 0;
function createData(
  status,
  clientName,
  dates,
  location,
  workNumber,
  typeOfEngagement,
  request
) {
  counter += 1;
  return {
    id: counter,
    status,
    clientName,
    dates,
    location,
    workNumber,
    typeOfEngagement,
    request,
  };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
  {
    id: 'clientName',
    numeric: false,
    disablePadding: false,
    label: 'Client Name',
  },
  { id: 'dates', numeric: false, disablePadding: false, label: 'Dates' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
  {
    id: 'workNumber',
    numeric: false,
    disablePadding: false,
    label: 'Work Number',
  },
  {
    id: 'typeOfEngagement',
    numeric: false,
    disablePadding: false,
    label: 'Type of Engagement',
  },
  { id: 'request', numeric: false, disablePadding: false, label: 'Request' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Engagements
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Engagements extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'status',
    selected: [],
    data: [
      createData(
        'Staffing',
        'A Company',
        '3/25/19 - 4/25/19',
        'New York',
        '1ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Staffing',
        'B Company',
        '4/25/19 - 5/25/19',
        'Austin',
        '2ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Staffing',
        'C Company',
        '5/25/19 - 6/25/19',
        'San Francisco',
        '3ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Staffing',
        'D Company',
        '6/25/19 - 7/25/19',
        'Raleigh',
        '4ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Staffing',
        'E Company',
        '8/25/19 - 9/25/19',
        'Toronto',
        '5ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Staffing',
        'F Company',
        '9/25/19 - 10/25/19',
        'Nice',
        '6ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Staffing',
        'G Company',
        '11/25/19 - 12/25/19',
        'Copenhagen',
        '7ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Staffing',
        'H Company',
        '3/30/19 - 5/20/19',
        'Dubai',
        '8ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Completed',
        'I Company',
        '4/1/19 - 4/30/19',
        'Sao Paulo',
        '9ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'On Hold',
        'J Company',
        '4/15/19 - 6/22/19',
        'Singapore',
        '10ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Completed',
        'K Company',
        '6/22/19 - 10/18/19',
        'Japan',
        '11ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'Completed',
        'L Company',
        '10/9/19 - 10/18/19',
        'GCG',
        '12ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
      createData(
        'On Hold',
        'M Company',
        '4/9/19 - 10/9/19',
        'New York',
        '13ABCDE',
        'MVP Build',
        '2 Designers, 3 Developers, 1 Architect'
      ),
    ],
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.status}
                      </TableCell>
                      <TableCell align="left" padding="">
                        {n.clientName}
                      </TableCell>
                      <TableCell align="left">{n.dates}</TableCell>
                      <TableCell align="left">{n.location}</TableCell>
                      <TableCell align="left">{n.workNumber}</TableCell>
                      <TableCell align="left">{n.typeOfEngagement}</TableCell>
                      <TableCell align="left">{n.request}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

Engagements.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Engagements);
