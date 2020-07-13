import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Skeleton from '@material-ui/lab/Skeleton';

import PageBreadcrumbs from '../../components/PageBreadcrumbs';

import useDataFetch from '../../hooks/useDataFetch';

const useStyles = makeStyles((theme) => ({
  coverImgContainer: {
    height: 'auto',
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
          {selectedArrangement && selectedArrangement?.type === 'image' ? (
            <img
              className={classes.coverImg}
              src={process.env.REACT_APP_PROD_URL + selectedArrangement.file}
              alt={selectedArrangement.name}
            />
          ) : selectedArrangement?.type === 'video' ? (
            <video controls className={classes.coverImg}>
              <source
                src={process.env.REACT_APP_PROD_URL + selectedArrangement.file}
                type="video/mp4"
              />
            </video>
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
