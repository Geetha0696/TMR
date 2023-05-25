import { Box, Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import style from './style.module.css'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Modal from '../Modal'

const NewTask = (props) => {
    const { open, setOpen } = props
    const [age, setAge] = useState('');

    return (
        <Modal {...props} title="New Task">
            <Grid container sm={12} className={style.gridBody}>
                <Grid item sm={3} >
                    <Box>Planned duration</Box>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value="1h"
                        size='small'
                        onChange={(e) => console.log(e.target.value)}
                        className={style.dropdown}
                    >
                        <MenuItem selected value={1}>1h </MenuItem>
                        <MenuItem value={2}>2h </MenuItem>
                        <MenuItem value={3}>3h </MenuItem>
                    </Select>
                </Grid>

                <Grid item sm={3} >
                    <div>Project</div>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        size='small'
                        onChange={(e) => console.log(e.target.value)}
                        className={style.dropdown}
                    >
                        <MenuItem selected value={1}> React  </MenuItem>
                        <MenuItem value={2}>Node.js </MenuItem>
                        <MenuItem value={3}>Next.js </MenuItem>
                    </Select>
                </Grid>
                <Grid item sm={2} >
                    <div>Status</div>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size='small'
                        value={age}
                        onChange={(e) => console.log(e.target.value)}
                        className={style.dropdown}
                    >
                        <MenuItem selected value={1}>Billable </MenuItem>
                        <MenuItem value={2}>Non Billable</MenuItem>
                    </Select>
                </Grid>
                <Grid item sm={4} >
                    <div>Date</div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={new Date()}
                            format="dd-MM-yyyy"
                            sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                            maxDate={new Date()}
                            className='date-picker-input'
                        />
                    </LocalizationProvider>
                </Grid>

            </Grid>

            < Grid item sm={12} >
                <div>Title</div>
                <TextField size='small' className={style.title} ></TextField>
            </Grid>
            < Grid item sm={12}>
                <div>Description</div>
                <TextField size='small' multiline rows={5} className={style.description}></TextField>
            </Grid>
            < Grid item xs={12} md={4} textAlign="end" mr={2} >
                <Button variant="contained"  >Submit</Button>
            </Grid>
        </Modal>
    )
}

export default NewTask