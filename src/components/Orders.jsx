import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: `${theme.spacing(4)}px 0`,
  },
  tableHead: {
    fontSize: '12px',
    color: theme.palette.text.secondary,
  },
  centeredContainer: {
    margin: theme.spacing(6),
    textAlign: 'center',
  },
}));

const Orders = ({ userOrders }) => {
  const classes = useStyles();

  if (!userOrders) {
    return (
      <div className={classes.centeredContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (userOrders?.length < 1) {
    return (
      <div className={classes.centeredContainer}>
        <Typography variant="h6" color="textPrimary">
          Još nemate narudžbi.
        </Typography>
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
          {userOrders?.data.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                {('0000' + order.id).substring(order.id.length)}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat('hr-HR', {
                  style: 'currency',
                  currency: 'HRK',
                }).format(order.gross)}
              </TableCell>
              <TableCell>{order.created_at.replace(' ', ', ')}</TableCell>
              <TableCell>{order.status}</TableCell>
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
