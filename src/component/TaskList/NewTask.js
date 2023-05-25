import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import style from './style.module.css'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Modal from '../Modal'

const NewTask = (props) => {
    const {  projectList } = props
    const hours = [];
    const BillableOptions = [
        { label: 'Billable', value: "billable" },
        { label: 'Non-Billable', value: "non billable" },
    ];
    for (let i = 1; i <= 10; i++) {
        let obj = { label: `${i}h`, value: i }
        hours.push(obj);
    }
    return (
        <Modal {...props} title="New Task" size={800}>
            <Grid container sm={12} className={style.gridBody}>
                <Grid item sm={3} >
                    <Autocomplete
                        options={hours}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} label="Duration" />}
                        sx={{ fontSize: "5px", mb: 1, width: '80%' }}
                        size='small'
                    />
                </Grid>

                <Grid item sm={3} >
                    <Autocomplete
                        options={projectList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Project" />}
                        sx={{ fontSize: "8px", mb: 2, width: '80%' }}
                        size='small'

                    />
                </Grid>
                <Grid item sm={2} >
                    <Autocomplete
                        options={BillableOptions}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} label="Billable" />}
                        sx={{ fontSize: "8px", mb: 2, width: '80%' }}
                        size='small'

                    />
                </Grid>
                <Grid item sm={4} >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={new Date()}
                            format="dd-MM-yyyy"
                            sx={{ fontSize: "8px", mb: 2, width: '80%' }}
                            maxDate={new Date()}
                            className='date-picker-input'
                        />
                    </LocalizationProvider>
                </Grid>

            </Grid>

            < Grid item sm={12}  >
                <TextField label="Title" size='small' className={style.title} ></TextField>
            </Grid>
            < Grid item sm={12}  >
                <TextField label="Description" multiline rows={5} className={style.description}></TextField>
            </Grid>
            < Grid item xs={12} md={4} textAlign="end" mr={2} >
                <Button variant="contained"  >Submit</Button>
            </Grid>
        </Modal>
    )
}

export default NewTask