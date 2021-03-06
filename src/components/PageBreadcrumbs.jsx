import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderBottom: (showBorder) =>
      showBorder && `1px solid ${theme.palette.primary.main}`,
    width: '100%',
  },
}));

const PageBreadcrumbs = ({ titles, showBorder }) => {
  const classes = useStyles(showBorder);
  const location = useLocation();
  const crumbs = location.pathname.split('/').slice(1);
  let url = '';

  return (
    <div className={classes.breadcrumbsContainer}>
      <Typography
        className="mb-3"
        color="textPrimary"
        component="h1"
        variant="h3"
      >
        {titles[titles.length - 1] ? (
          titles[titles.length - 1]
        ) : (
          <Skeleton animation="wave" width={300} className="mb-3" />
        )}
      </Typography>

      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">
          <Typography color="primary" variant="body1">
            POČETNA
          </Typography>
        </Link>
        {crumbs.map((crumb, iterator) => {
          url += `${crumb}/`;
          return (
            <Link to={`/${url.slice(0, -1)}`} key={crumb}>
              <Typography>
                {titles[iterator] ? (
                  titles[iterator].toUpperCase()
                ) : (
                  <Skeleton width={100} />
                )}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default PageBreadcrumbs;
