import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: `${theme.spacing(4)}px 0`,
  },
  tableHead: {
    fontSize: '12px',
    color: theme.palette.text.secondary,
  },
  loaderContainer: {
    margin: theme.spacing(6),
    textAlign: 'center',
  },
}));

const Orders = ({ userOrders }) => {
  const classes = useStyles();

  console.log(userOrders);

  if (!userOrders) {
    return (
      <div className={classes.loaderContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>BROJ NARUDŽBE</TableCell>
            <TableCell className={classes.tableHead}>UKUPNA CIJENA</TableCell>
            <TableCell className={classes.tableHead}>DATUM KREIRANJA</TableCell>
            <TableCell className={classes.tableHead}>STATUS OBRADE</TableCell>
            <TableCell className={classes.tableHead}>
              PREGLEDAJ NARUDŽBU
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Pregledaj
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
