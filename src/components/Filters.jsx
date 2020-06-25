import React, { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import Search from '@material-ui/icons/Search';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';
import { makeStyles } from '@material-ui/core/styles';

import { productsView, setQuery } from '../actions/filters';

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    marginTop: theme.spacing(3),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  filterButton: {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    minWidth: '50px',
    maxWidth: '50px',
  },
}));

const Filters = ({ showView = true }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const THROTTLE_TIME = 800;

  const view = useSelector((state) => state.filter.product_view);

  const handleChange = useCallback(
    _.debounce((e) => {
      dispatch(
        setQuery({ filterType: e.target.name, filterValue: e.target.value })
      );
    }, THROTTLE_TIME),
    [dispatch]
  );

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      style={{ justifyContent: 'center' }}
    >
      <Grid item xs={3}>
        <TextField
          fullWidth
          name="name"
          size="small"
          margin="normal"
          variant="outlined"
          onChange={(e) => {
            e.persist();
            handleChange(e);
          }}
          label="Pretraživanje po nazivu"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  className={classes.filterButton}
                  color="primary"
                  variant="contained"
                >
                  <Search />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          size="small"
          name="code"
          margin="normal"
          variant="outlined"
          label="Pretraživanje po šifri"
          onChange={(e) => {
            e.persist();
            handleChange(e);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  className={classes.filterButton}
                  color="primary"
                  variant="contained"
                >
                  <Search />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          size="small"
          margin="normal"
          name="barcode"
          variant="outlined"
          label="Pretraživanje po barcodu"
          onChange={(e) => {
            e.persist();
            handleChange(e);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  className={classes.filterButton}
                  color="primary"
                  variant="contained"
                >
                  <Search />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {showView && (
        <>
          <Grid item xs={2}>
            <FormControl
              className={classes.filterInput}
              fullWidth
              variant="outlined"
              size="small"
              margin="normal"
            >
              <InputLabel id="sort">Sortiraj po</InputLabel>
              <Select labelId="sort" defaultValue="">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={1}>
            <div>
              <IconButton onClick={() => dispatch(productsView('list'))}>
                <ViewList color={view === 'list' ? 'primary' : 'inherit'} />
              </IconButton>
              <IconButton onClick={() => dispatch(productsView('grid'))}>
                <ViewModule color={view === 'grid' ? 'primary' : 'inherit'} />
              </IconButton>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Filters;
