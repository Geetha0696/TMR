import { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

import axios from '@/utils/axios'
import { useSelector } from 'react-redux';
import style from './style.module.css'
import Modal from '../Modal'


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Viewtask = (props) => {

    const { open, setOpen } = props
    const { authToken } = useSelector((state) => state.auth)
    const [viewData, setViewData] = useState([]);

    const getData = useCallback(() => {
        if (props.data) {
            const { user, timesheet_date } = props.data;

            const headers = {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + authToken
            };

            const request = {
                user_id: user ? user.user_id : null,
                start_date: timesheet_date,
                end_date: timesheet_date,
                page: 1,
                limit: 20
            }
            axios
                .post(`/api/timesheet/list`, request, {
                    headers: headers,
                })
                .then((response) => {
                    if (response.data.flag) {
                        setViewData(response.data.data);
                    } else {
                        toast.error(response.data.message)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [props.data, authToken]);

    useEffect(() => {
        getData();
    }, [props.data])

    return (
        <Modal {...props} title="View Task" size={800}>
            <Container maxWidth="lg">
                <Grid container p={2}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ fontSize: '16px', fontWeight: 600 }}>Date : <Box sx={{ fontSize: '16px', fontWeight: 400, display: 'inline' }}> {viewData.length > 0 ? viewData[0].timesheet_date : ""}</Box></Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ fontSize: '16px', fontWeight: 600 }}>User : <Box sx={{ fontSize: '16px', fontWeight: 400, display: 'inline' }}> {viewData.length > 0 ? viewData[0].user.first_name : ""}</Box></Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={style.table_header}>Project Name</TableCell>
                                        <TableCell className={style.table_header}>Estimation</TableCell>
                                        <TableCell className={style.table_header}>Billable</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className={style.table_body}>
                                    {viewData.map((row) => (
                                        <TableRow hover key={row.timesheet_id}>
                                            <TableCell>
                                                {row.timesheet_title}
                                            </TableCell>
                                            <TableCell>{row.timesheet_estimation}</TableCell>
                                            <TableCell>{row.timesheet_billable_type}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item sm={12} display="flex" justifyContent="end">
                        <Button variant="contained" sx={{ margin: 2 }} onClick={() => setOpen(false)}>Ok</Button>
                    </Grid>
                </Grid>
            </Container>
        </Modal >
    )
}

export default Viewtask