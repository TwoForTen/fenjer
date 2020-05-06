import React, { useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PageBreadcrumbs from '../components/PageBreadcrumbs';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '40px',
    padding: '15px',
    background: '#45484C'
  },
  paragraphContainer: {
    padding: theme.spacing(4) + theme.spacing(1.5),
  },
  text: {
    color: '#7E7F80'
  },
  date: {
    marginLeft: 'auto',
    color: '#B57D62'
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    width: '120px',
    marginLeft: '8px',
    color: theme.palette.getContrastText('rgb(181,125,98)'),
    backgroundColor: 'rgb(181,125,98)',
    '&:hover': {
      backgroundColor: 'rgb(143,98,73)',
    },
    borderRadius: '5px',
    textTransform: 'initial'
},
}))(Button);


const Novosti = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({ top: '0' });
  }, []);

  return (
    <>
      <PageBreadcrumbs title="Novosti" />
      <Container>
        <div className={classes.paragraphContainer}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Naslov novosti
              </Typography>
              <Typography className={classes.text} component="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ColorButton className={classes.margin}>
                Pročitajte više
              </ColorButton>
              <Button className={classes.date} size="small">24. travnja 2020.</Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Naslov novosti
              </Typography>
              <Typography className={classes.text} component="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ColorButton className={classes.margin}>
                Pročitajte više
              </ColorButton>
              <Button className={classes.date} size="small">24. travnja 2020.</Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Naslov novosti
              </Typography>
              <Typography className={classes.text} component="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ColorButton className={classes.margin}>
                Pročitajte više
              </ColorButton>
              <Button className={classes.date} size="small">24. travnja 2020.</Button>
            </CardActions>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Novosti;
