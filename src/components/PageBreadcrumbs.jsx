import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    padding: '80px 1.5rem',
    borderBottom: (showBorder) =>
      showBorder && `1px solid ${theme.palette.primary.main}`,
    width: '100%',
  },
}));

const PageBreadcrumbs = ({ title, showBorder }) => {
  const classes = useStyles(showBorder);
  const location = useLocation();
  const crumbs = location.pathname.split('/').slice(1);
  const titles = title.split(',');
  return (
    <Container>
      <div className={classes.breadcrumbsContainer}>
        <Typography
          className="mb-3"
          color="textPrimary"
          component="h1"
          variant="h2"
        >
          {titles[titles.length - 1]}
        </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">
            <Typography color="primary" variant="body1">
              POČETNA
            </Typography>
          </Link>
          {crumbs.map((crumb, iterator) => {
            return (
              <Link to={`/${crumb}`} key={crumb}>
                <Typography>
                  {titles[iterator]}
                </Typography>
              </Link>
            );
          })}
        </Breadcrumbs>
      </div>
    </Container>
  );
};

export default PageBreadcrumbs;
