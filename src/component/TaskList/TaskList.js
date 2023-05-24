import * as React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, GridAddIcon } from '@mui/x-data-grid';
import NewTask from './NewTask';
import style from './style.module.css'

const columns = [
  { field: 'id', headerName: 'ID', width: 70, flex: 1 },
  { field: 'firstName', headerName: 'First name', width: 130, flex: 1 },
  { field: 'lastName', headerName: 'Last name', width: 130, flex: 1 },
  {
    field: 'age',
    headerName: 'Age',
    width: 90,
    flex: 1
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160, flex: 1,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  const[open,setOpen]=React.useState(false)
  return (
    <>
    <Button className={style.addtask} onClick={()=>setOpen(true)}><GridAddIcon/>Add Task</Button>
    <Box
      sx={{
        height: 400,
        width: '100%',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#000033',
          color: '#fff'
        },
        '& .MuiDataGrid-columnHeaders .MuiCheckbox-root': {
          color: '#fff'
        },
      }}
    >
      
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ background: "#fff" }}
      />
    </Box>
    <NewTask open={open} setOpen={setOpen}/>
    </>
  );
}