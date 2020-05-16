import React from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
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
  filterInput: {
    maxWidth: '180px',
  },
}));

const Filters = () => {
  const classes = useStyles();
  return (
    <div className={classes.filterContainer}>
      <TextField
        size="small"
        margin="normal"
        variant="outlined"
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
      <TextField
        size="small"
        margin="normal"
        variant="outlined"
        label="Pretraživanje po šifri"
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
      <FormControl
        className={classes.filterInput}
        fullWidth
        variant="outlined"
        size="small"
        margin="normal"
      >
        <InputLabel id="brand">Odaberite brand</InputLabel>
        <Select labelId="brand">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        className={classes.filterInput}
        fullWidth
        variant="outlined"
        size="small"
        margin="normal"
      >
        <InputLabel id="broj">Broj proizvoda</InputLabel>
        <Select labelId="broj">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        className={classes.filterInput}
        fullWidth
        variant="outlined"
        size="small"
        margin="normal"
      >
        <InputLabel id="sort">Sortiraj po</InputLabel>
        <Select labelId="sort">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <div>
        <IconButton>
          <ViewList />
        </IconButton>
        <IconButton>
          <ViewModule />
        </IconButton>
      </div>
    </div>
  );
};

export default Filters;
