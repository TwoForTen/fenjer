import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import _ from 'lodash';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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

const useTranslateStatus = () => {
  const theme = useTheme();
  const translateStatus = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Typography
            component="span"
            style={{ color: theme.palette.error.main, fontSize: '14px' }}
          >
            Narudžba nije obrađena
          </Typography>
        );
      case 'dispatched':
        return (
          <Typography
            component="span"
            style={{ color: theme.palette.success.main, fontSize: '14px' }}
          >
            Narudžba isporučena
          </Typography>
        );
      default:
        break;
    }
  };
  return (status) => translateStatus(status);
};

const Orders = ({ userOrders }) => {
  const classes = useStyles();
  const translateStatus = useTranslateStatus();

  const [orders, setOrders] = useState({ data: [], links: {}, meta: {} });
  const [page, setPage] = useState(0);

  useEffect(() => {
    setOrders(userOrders);
  }, [userOrders]);

  const handleChangePage = (_, newPage) => {
    axios.get(`/auth/orders?page=${newPage + 1}`).then((res) => {
      setOrders((prevState) => {
        return {
          ...prevState,
          data: res.data.data,
        };
      });
      setPage(newPage);
    });
  };

  if (!orders) {
    return (
      <div className={classes.centeredContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (orders?.data?.length < 1) {
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
          {orders?.data.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{_.padStart(order.id, '6', '000000')}</TableCell>
              <TableCell>
                {new Intl.NumberFormat('hr-HR', {
                  style: 'currency',
                  currency: 'HRK',
                }).format(order.gross)}
              </TableCell>
              <TableCell>
                {moment(order.created_at).format('DD.MM.YYYY, HH:mm:ss')}
              </TableCell>
              <TableCell>{translateStatus(order.status)}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Pregledaj
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={orders.meta.total}
        rowsPerPage={orders.meta.per_page}
        page={page}
        onChangePage={handleChangePage}
      />
    </TableContainer>
  );
};

export default Orders;
