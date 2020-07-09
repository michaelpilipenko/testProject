import React, {useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector} from "react-redux";
import { format } from 'date-fns'
import {useRouter} from "next/router";

 const Result = () => {
     const {placeInfo} = useSelector(state => state.reservation);
     const router = useRouter();

     useEffect(() => {
         if(!placeInfo?.reservationCheckin) router.replace('/')
     },[]);

    return (
        <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Hotel name</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">Rating</TableCell>
                        <TableCell align="right">Reservation Checkin</TableCell>
                        <TableCell align="right">Reservation Checkout</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">{placeInfo?.name}</TableCell>
                            <TableCell align="right">{placeInfo?.address}</TableCell>
                            <TableCell align="right">{placeInfo?.phone}</TableCell>
                            <TableCell align="right">{placeInfo?.rating}</TableCell>
                            <TableCell align="right">{format(new Date(placeInfo?.reservationCheckin ?? new Date()), 'dd/MM/yyyy hh:mm')}</TableCell>
                            <TableCell align="right">{format(new Date(placeInfo?.reservationCheckout  ?? new Date()), 'dd/MM/yyyy hh:mm')}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Result