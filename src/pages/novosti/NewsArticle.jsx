import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '15px',
    background: '#45484C',
  },
  paragraphContainer: {
    padding: theme.spacing(4) + theme.spacing(1.5),
  },
  text: {
    color: '#7E7F80',
  },
  date: {
    marginLeft: 'auto',
  },
}));

const NewsArticle = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({ top: '0' });
  }, []);

  return (
    <>
      <PageBreadcrumbs titles={['Novosti', 'Naslov']} />
      <Container>
        <div className={classes.paragraphContainer}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Naslov novosti
              </Typography>
              <Typography className={classes.text} component="p">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type. Lorem Ipsum is simply dummy text
                of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type. Lorem Ipsum is simply dummy text
                of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type. Lorem Ipsum is simply
                dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Typography className={classes.date} variant="subtitle2">
                24. travnja 2020.
              </Typography>
            </CardActions>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default NewsArticle;
