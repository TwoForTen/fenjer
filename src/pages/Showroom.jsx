import React from 'react';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';

import PageBreadcrumbs from '../components/PageBreadcrumbs';
import ShowroomCard from '../components/ShowroomCard';

import useDataFetch from '../hooks/useDataFetch';

const Showroom = () => {
  const arrangements =
    useDataFetch({
      url: '/arrangements',
      method: 'GET',
    }) || [];

  console.log(arrangements);

  return (
    <>
      <PageBreadcrumbs titles={['Showroom']} />
      <Grid container spacing={3} className="mb-3 mt-3">
        {!_.isEmpty(arrangements) &&
          arrangements?.data.map((arrangement) => {
            return (
              <Grid item md={3} sm={4} xs={6} key={arrangement.id}>
                <ShowroomCard arrangement={arrangement} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default Showroom;
