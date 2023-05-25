import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Grid, Typography, TextField, Autocomplete, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Search, Refresh, ExpandMore, Add } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import axios from '@/utils/axios'
import { YYYYMMDD } from "@/utils/common";
import NewTask from './NewTask';
import style from './style.module.css'

function TimesheetTable() {
  var date = new Date();

  const filterForm = {
    project: null,
    title: "",
    billable: null,
    start_date: new Date(date.getFullYear(), date.getMonth(), 1),
    end_date: date,
  }
  const BillableOptions = [
    { label: 'Billable', value: "billable" },
    { label: 'Non-Billable', value: "non billable" },
  ];

  const columns = useMemo(
    () => [
      { field: 'timesheet_date', headerName: 'Date', width: 60, flex: 1 },
      { field: 'project', headerName: 'Project Name', valueGetter: (params) => params.row.project.project_name, width: 60, flex: 1 },
      { field: 'timesheet_title', headerName: 'Title', width: 120, flex: 1 },
      { field: 'timesheet_estimation', headerName: 'Estimation', width: 70, flex: 1 },
      { field: 'timesheet_billable_type', headerName: 'Billable', width: 130, flex: 1 },
      { field: 'user', headerName: 'User', valueGetter: (params) => params.row.user.first_name, width: 60, flex: 1 },
    ], []);

  const { authToken } = useSelector((state) => state.auth)
  const [projectList, setProjectList] = useState([]);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 0,
    limit: 10,
  });
  const [filterFormData, setFilterFormData] = useState(filterForm);
  const [open, setOpen] = useState(false)


  const filterList = useCallback(() => {
    let { page, limit } = pageState
    const { title, project, billable, start_date, end_date } = filterFormData;

    const headers = {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    };

    setPageState((old) => ({ ...old, isLoading: true }));
    const request = {
      title,
      project_id: project ? project.id : null,
      billable: billable ? billable.value : "",
      start_date: YYYYMMDD(start_date),
      end_date: YYYYMMDD(end_date),
      page: page + 1,
      limit
    }
    axios
      .post(`/api/timesheet/list`, request, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.flag) {
          setPageState((old) => ({
            ...old,
            isLoading: false,
            data: response.data.data,
            total: response.data.total,
          }));
        } else {
          toast.error(response.data.message)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [pageState, filterFormData, authToken]);

  const getProjectList = useCallback(() => {

    const headers = {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + authToken
    };

    axios
      .post(`/api/project/list`, {}, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.flag) {
          setProjectList(response.data.data);
        } else {
          toast.error(response.data.message)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [authToken]);

  useEffect(() => {
    getProjectList();
  }, [])

  useEffect(() => {
    console.log('pageState', pageState.page, pageState.limit)
    filterList();
  }, [pageState.page, pageState.limit])

  return (
    <>
      <Grid container spacing={2} justifyContent="end" mb={2}>
        <Grid item xs={12} md={4} textAlign="end" mr={2}>
          <Button variant="contained" title="Add Task" onClick={() => setOpen(true)} className={style.button} sx={{ borderRadius: '5px !important' }}>
            <Add /> Add Task
          </Button>
        </Grid>
      </Grid>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <Grid container spacing={2}>
            <Grid item xs={6} md={2}>
              <TextField
                value={filterFormData.title || ""}
                label="Title"
                variant="outlined"
                sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                size='small'
                onChange={(e) => setFilterFormData({ ...filterFormData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="From Date"
                  value={filterFormData.start_date || new Date()}
                  format="dd-MM-yyyy"
                  sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                  maxDate={new Date()}
                  onChange={(date) => {
                    if (date > filterFormData.end_date) {
                      setFilterFormData({ ...filterFormData, start_date: date, end_date: date })
                    } else {
                      setFilterFormData({ ...filterFormData, start_date: date })
                    }
                  }}
                  className='date-picker-input'
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="To Date"
                  value={filterFormData.end_date || new Date()}
                  format="dd-MM-yyyy"
                  sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                  minDate={filterFormData.start_date}
                  maxDate={new Date()}
                  onChange={(date) => setFilterFormData({ ...filterFormData, end_date: date })}
                  className='date-picker-input'
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={2}>
              <Autocomplete
                options={BillableOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} label="Billable" />}
                value={filterFormData.billable}
                sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                size='small'
                onChange={(e, v) => {
                  setFilterFormData({ ...filterFormData, billable: v })
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Autocomplete
                options={projectList}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Project" />}
                value={filterFormData.project}
                sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                size='small'
                onChange={(e, v) => {
                  setFilterFormData({ ...filterFormData, project: v })
                }}
              />
            </Grid>
            <Grid item xs={6} md={2} sx={{ textAlign: 'center' }}>
              <Button variant="contained" title="Search" onClick={() => filterList()} className={style.button}>
                <Search />
              </Button>
              <Button variant="contained" title="Refresh" onClick={() => setFilterFormData(filterForm)} className={style.button}>
                <Refresh />
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
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
          "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within, & .MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
            outline: "none !important",
          }
        }}
      >
        <DataGrid
          checkboxSelection
          columns={columns}
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          pageSizeOptions={[10, 25, 50, 100]}
          initialState={{
            pagination: { paginationModel: { page: pageState.page, pageSize: pageState.limit } },
          }}
          pagination
          disableColumnMenu
          paginationMode="server"
          onPaginationModelChange={(newPage) => setPageState(old => ({ ...old, page: newPage.page, limit: newPage.pageSize }))}
          getRowId={(row) => row.timesheet_id}
          autoHeight
          sx={{ background: "#fff" }}
        />
      </Box>
      <NewTask open={open} setOpen={setOpen} />
    </>
  );
}
export default TimesheetTable;