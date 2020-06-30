import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Skeleton from '@material-ui/lab/Skeleton';

import PageBreadcrumbs from '../../components/PageBreadcrumbs';

import useDataFetch from '../../hooks/useDataFetch';

import showroom_img from '../../assets/showroom.jpg';

const useStyles = makeStyles((theme) => ({
  coverImgContainer: {
    height: '500px',
    borderRadius: theme.shape.borderRadius,
  },
  coverImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
  },
}));

const Arrangement = () => {
  const classes = useStyles();
  const params = useParams();

  const selectedArrangement = useDataFetch({
    url: `/arrangements/${params.arrangementId}`,
    method: 'GET',
  });

  return (
    <>
      <Helmet titleTemplate="%s | Fenjer.hr">
        <title>{selectedArrangement?.name}</title>
      </Helmet>
      <PageBreadcrumbs titles={['Showroom', selectedArrangement?.name]} />
      <div
        className="mt-4 mb-4"
        style={{ textAlign: !selectedArrangement && 'center' }}
      >
        <div className={classes.coverImgContainer}>
          {selectedArrangement ? (
            <img
              className={classes.coverImg}
              src={showroom_img}
              alt="showroom_img"
            />
          ) : (
            <Skeleton
              style={{ transform: 'scale(1)' }}
              animation="wave"
              height={500}
            />
          )}
        </div>

        {selectedArrangement ? (
          <>
            {selectedArrangement?.description && (
              <>
                <Typography className="mt-4" variant="h6" color="textPrimary">
                  Opis
                </Typography>
                <Typography color="textSecondary" variant="body2" paragraph>
                  {selectedArrangement?.description}
                </Typography>
              </>
            )}
          </>
        ) : (
          <CircularProgress className="mt-4" />
        )}
      </div>
    </>
  );
};

export default Arrangement;
