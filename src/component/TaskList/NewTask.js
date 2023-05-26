import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import style from './style.module.css'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Modal from '../Modal'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewTask = (props) => {
    const { projectList } = props
    const hours = [];
    const BillableOptions = [
        { label: 'Billable', value: "billable" },
        { label: 'Non-Billable', value: "non billable" },
    ];
    for (let i = 1; i <= 10; i++) {
        let obj = { label: `${i}h`, value: i }
        hours.push(obj);
    }
    const validationSchema = Yup.object({
        title: Yup
            .string('Enter your email')
            .required('Email is required'),
    });
    const formik = useFormik({
        initialValues: {
            estimation: '',
            title: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => handleSubmit(values)
    });
    const handleSubmit = (value) => {
        console.log(value)
        // const userData = {
        //   email: value.email,
        // }
        // axios.post("api/auth/forgotPassword", userData)
        //   .then((response) => {
        //     if (response.data.flag) {
        //       toast.success(response.data.message);
        //       router.push('/login')
        //     } else {
        //       toast.error(response.data.message)
        //     }
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });


    }
    console.log(formik)
    return (
        <Modal {...props} title="New Task" size={800}>
            <Grid container spacing={2}>
                <Grid item sm={3} >
                    <Autocomplete
                        options={hours}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} label="Duration"
                            name="estimation"
                            id="estimation"
                            error={formik.touched.estimation && Boolean(formik.errors.estimation)}
                            helperText={formik.touched.estimation && formik.errors.estimation} />
                        }
                        sx={{ fontSize: "5px", mb: 1, width: '100%' }}
                        size='small'
                        onChange={formik.handleChange}
                    />
                </Grid>

                <Grid item sm={3} >
                    <Autocomplete
                        options={projectList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Project" />}
                        sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                        size='small'

                    />
                </Grid>
                <Grid item sm={3} >
                    <Autocomplete
                        options={BillableOptions}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => <TextField {...params} label="Billable" />}
                        sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                        size='small'

                    />
                </Grid>
                <Grid item sm={3} >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={new Date()}
                            format="dd-MM-yyyy"
                            sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                            maxDate={new Date()}
                            className='date-picker-input'
                        />
                    </LocalizationProvider>
                </Grid>

            </Grid>

            < Grid item sm={12}  >
                <TextField label="Title" size='small' className={style.title}
                    id="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title} />
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