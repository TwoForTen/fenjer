import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    padding: theme.spacing(6),
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    margin: '0 auto',
    bottom: '20px',
    alignSelf: 'center',
    maxWidth: '90%',
    zIndex: theme.zIndex.modal,
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  paragraph: {
    fontWeight: 200,
  },
  button: {
    backgroundColor: '#292A2C',
    color: theme.palette.text.primary,
    minWidth: '120px',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
}));

const CookiesModal = () => {
  const classes = useStyles();

  return (
    <div id="cookies-modal" className={classes.modalRoot}>
      <Typography className={classes.paragraph} color="textPrimary" paragraph>
        Informacije i suglasnost za kolačiće (Cookies) ova web stranica koristi
        kolačiće kako bi se poboljšalo Vaše iskustvo korištenja web stranice i
        pružila uslugu u skladu s Vašim željama. Postavke kolačića mogu se
        kontrolirati i konfigurirati u na našoj web stranici i u Vašem web
        pretraživaču. Ako želite nastaviti koristiti našu web stranicu molimo
        Vas da potvrdite da se slažete s upotrebom kolačića klikom na gumb
        “Shvaćam”.
      </Typography>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => {
          document.getElementById('cookies-modal').style.display = 'none';
          localStorage.setItem('cookies_seen', JSON.stringify(true));
        }}
      >
        Shvaćam
      </Button>
    </div>
  );
};

export default CookiesModal;
