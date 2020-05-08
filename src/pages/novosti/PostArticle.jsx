import React, { useEffect, useState } from 'react';
import axios from '../../axiosInstance';
import { useParams } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

const PostArticle = () => {
  const classes = useStyles();
  const params = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    window.scrollTo({ top: '0' });

    axios.get(`/posts/${params.novostId}`).then((res) => setPost(res.data));
  }, []);

  return (
    <>
      <PageBreadcrumbs titles={['Novosti', post.title]} />
      <Container>
        <div className={classes.paragraphContainer}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography className={classes.text} component="p">
                {post.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Typography
                color="primary"
                className={classes.date}
                variant="subtitle2"
              >
                24. travnja 2020.
              </Typography>
            </CardActions>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default PostArticle;
