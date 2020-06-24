import React from 'react';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import PageBreadcrumbs from '../../components/PageBreadcrumbs';
import ShowroomCard from '../../components/ShowroomCard';

import useDataFetch from '../../hooks/useDataFetch';
import CircularProgress from '@material-ui/core/CircularProgress';

const Showroom = () => {
  const arrangements =
    useDataFetch({
      url: '/arrangements',
      method: 'GET',
    }) || [];

  return (
    <>
      <PageBreadcrumbs titles={['Showroom']} />
      {!_.isEmpty(arrangements) ? (
        <Grid container spacing={3} className="mb-3 mt-3">
          {arrangements?.data.map((arrangement) => {
            return (
              <Grid item md={3} sm={4} xs={6} key={arrangement.id}>
                <ShowroomCard arrangement={arrangement} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div style={{ textAlign: 'center' }} className="mt-4 mb-4">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Showroom;
