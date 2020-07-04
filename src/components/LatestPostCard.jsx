import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const LatestPostCard = ({ post }) => {
  return (
    <Link to={post ? `/novosti/${post.id}` : ''}>
      <Card className="mb-3">
        <CardActionArea>
          {post ? (
            <CardMedia
              style={{ height: 140 }}
              image={post && 'https://picsum.photos/300/200'}
              title={post && post.title}
            />
          ) : (
            <Skeleton variant="rect" height={140} animation="wave" />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post ? post.title : <Skeleton animation="wave" />}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {post ? (
                post.excerpt
              ) : (
                <>
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" style={{ width: '60%' }} />
                </>
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default LatestPostCard;
