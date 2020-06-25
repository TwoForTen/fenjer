import React, { useCallback, useEffect, useState } from 'react';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Search from '@material-ui/icons/Search';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';

import { productsView, setQuery, clearQuery, sort } from '../actions/filters';

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    marginTop: theme.spacing(3),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  // filterInput: {
  //   overflow: 'hidden',
  // },
  filterButton: {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    minWidth: '50px',
    maxWidth: '50px',
    zIndex: '101',
  },
  expansionPanel: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    marginTop: theme.spacing(2),
  },
}));

const Filters = ({ showView = true }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const THROTTLE_TIME = 250;
  const breakpoint = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const view = useSelector((state) => state.filter.product_view);

  const handleChange = useCallback(
    _.debounce((e) => {
      dispatch(
        setQuery({ filterType: e.target.name, filterValue: e.target.value })
      );
    }, THROTTLE_TIME),
    [dispatch]
  );

  useEffect(() => {
    return () => dispatch(clearQuery());
  }, []);

  const FILTERS = (
    <Grid
      container
      spacing={1}
      alignItems="center"
      style={{ justifyContent: 'center' }}
    >
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          name="name"
          size="small"
          margin="normal"
          variant="outlined"
          className={classes.filterInput}
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
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          size="small"
          name="code"
          margin="normal"
          variant="outlined"
          label="Pretraživanje po šifri"
          className={classes.filterInput}
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
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          size="small"
          margin="normal"
          name="barcode"
          variant="outlined"
          label="Pretraživanje po barcodu"
          className={classes.filterInput}
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
          <Grid item xs={12} md={3}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              margin="normal"
            >
              <InputLabel id="sort" htmlFor="sort-select">
                Sortiraj po
              </InputLabel>
              <Select
                labelId="sort"
                label="Sortiraj po"
                defaultValue="Nazivu (A-Z)"
                inputProps={{
                  name: 'sort',
                  id: 'sort-select',
                }}
                onChange={(e) => {
                  dispatch(sort(e.target.value));
                }}
              >
                <MenuItem value={'Nazivu (A-Z)'}>Nazivu (A-Z)</MenuItem>
                <MenuItem value={'Nazivu (Z-A)'}>Nazivu (Z-A)</MenuItem>
                <MenuItem value={'Cijeni (manja - veća)'}>
                  Cijeni (manja - veća)
                </MenuItem>
                <MenuItem value={'Cijeni (veća - manja)'}>
                  Cijeni (veća - manja)
                </MenuItem>
                <MenuItem value={'Dostupnost'}>Dostupnost</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {!breakpoint && (
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography color="textSecondary" className="mr-1">
                  Prikaz:
                </Typography>
                <IconButton onClick={() => dispatch(productsView('list'))}>
                  <ViewList color={view === 'list' ? 'primary' : 'inherit'} />
                </IconButton>
                <IconButton onClick={() => dispatch(productsView('grid'))}>
                  <ViewModule color={view === 'grid' ? 'primary' : 'inherit'} />
                </IconButton>
              </div>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );

  return (
    <>
      {breakpoint ? (
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Prikaži filtere</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{FILTERS}</ExpansionPanelDetails>
        </ExpansionPanel>
      ) : (
        FILTERS
      )}
    </>
  );
};

export default Filters;
