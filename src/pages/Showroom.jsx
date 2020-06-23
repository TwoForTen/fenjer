import React from 'react';
import _ from 'lodash';
import axios from '../axiosInstance';

import Grid from '@material-ui/core/Grid';

import PageBreadcrumbs from '../components/PageBreadcrumbs';
import ShowroomCard from '../components/ShowroomCard';

import useDataFetch from '../hooks/useDataFetch';

const Showroom = () => {
  const mock = [1, 2, 3, 4];

  const arrangements =
    useDataFetch({
      url: '/arrangement',
      method: 'GET',
    }) || [];

  console.log(arrangements);

  return (
    <>
      <PageBreadcrumbs titles={['Showroom']} />
      <Grid container spacing={3} align="center" className="mb-3 mt-3">
        {/* {!_.isEmpty(arrangements) &&
          arrangements?.map((arrangement) => {
            return (
              <ShowroomCard key={arrangement.id} arrangement={arrangement} />
            );
          })} */}
      </Grid>
    </>
  );
};

export default Showroom;
