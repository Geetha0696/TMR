import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import style from './style.module.css'
import NewTask from './NewTask';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Brand audit', 1, 3, 4, 4, 2),
  createData('Plan gala entertaiment', 237, 9.0, 37, 4.3),
  createData('Design', 262, 16.0, 24, 6.0),
  createData('Total', 305, 3.7, 67, 4.3),
];

export default function BasicTable() {
  const[open,setOpen] = React.useState(false)
  return (
    <>
      <Button variant="contained" className={style.addtask} onClick={()=>setOpen(true)}><AddIcon /> Add Task </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert </TableCell>
              <TableCell align="right">15 Mon</TableCell>
              <TableCell align="right">16 Tue</TableCell>
              <TableCell align="right">17 Wed</TableCell>
              <TableCell align="right">18 Tha</TableCell>
              <TableCell align="right">19 Fri</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.Brand}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NewTask open={open} setOpen={setOpen}/>
    </>

  );
}
