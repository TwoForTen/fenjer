import React from 'react';

import Grid from '@material-ui/core/Grid';

import PageBreadcrumbs from '../components/PageBreadcrumbs';
import ShowroomCard from '../components/ShowroomCard';

const Showroom = () => {
  const mock = [1, 2, 3];

  return (
    <>
      <PageBreadcrumbs titles={['Showroom']} />
      <Grid container spacing={6} align="center" className="mb-3 mt-3">
        {mock.map((i) => {
          return <ShowroomCard key={i} />;
        })}
      </Grid>
    </>
  );
};

export default Showroom;
