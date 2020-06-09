import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import plant from '../assets/plant.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    maxWidth: '200px',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '&:hover > $typeMask': {
      cursor: 'pointer',
      opacity: '1',
    },
  },
  img: {
    width: '100%',
    height: 'auto',
    borderRadius: 'inherit',
  },
  typeMask: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    top: '0',
    left: '0',
    opacity: (styleProps) => {
      return styleProps.type.id === styleProps.selectedProduct ? '1' : '0';
    },
    transition: '300ms',
  },
}));

const OtherProductTypes = ({ type, selectedProduct, onClick }) => {
  const STYLE_PROPS = {
    type,
    selectedProduct,
  };
  const classes = useStyles(STYLE_PROPS);

  return (
    <Paper onClick={onClick} className={classes.root}>
      <div className={classes.typeMask}>
        <Typography>{type.name}</Typography>
      </div>
      <img className={classes.img} src={plant} alt="product_image" />
    </Paper>
  );
};

export default OtherProductTypes;
