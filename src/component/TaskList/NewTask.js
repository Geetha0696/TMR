import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import style from './style.module.css'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Modal from '../Modal'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import axios from '@/utils/axios'
import { YYYYMMDD } from "@/utils/common";
import { toast } from "react-toastify";

const NewTask = (props) => {
    const { authToken } = useSelector((state) => state.auth)
    const [projectList, setProjectList] = useState([]);
    const [estimation, setEstimation] = useState([])

    const BillableOptions = [
        { label: 'Billable', value: "billable" },
        { label: 'Non-Billable', value: "non billable" },
    ];
    useEffect(() => {
        getProjectList();
    }, [])


    const validationSchema = Yup.object({
        estimation: Yup
            .string('Select estimation Hours')
            .required('Select estimation Hours'),
        title: Yup
            .string('Enter the Title')
            .required('Enter the Title'),
        project: Yup
            .string('Select the Title')
            .required('Select the project'),
        billable: Yup
            .string('Select the billable')
            .required('Select the billable'),

    });

    const formik = useFormik({
        initialValues: {
            estimation: '',
            title: '',
            billable: "",
            project: "",
            description: "",
            date: new Date()
        },
        validationSchema: validationSchema,
        onSubmit: (value) => handleSubmit(value)
    });
    console.log(formik)
    const handleSubmit = (value) => {
        formik.resetForm()
        const userData = {
            project_id: value.project,
            title: value.title,
            date:YYYYMMDD(value.date),
            billable:  value.billable,
            estimation: value.estimation,
            status: true
        }
        const headers = {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
          };
        axios.post("/api/timesheet/create",userData, {
            headers: headers,
          })
          .then((response) => {
            console.log(response)
            if (response.data.flag) {
              toast.success(response.data.message);
              props.setOpen(false)
            } else {
              toast.error(response.data.message)
            }
          })
          .catch((error) => {
            console.error(error);
          });

    }
    const getProjectList = useCallback(() => {
        const hours = []
        
        for (let i = 0; i <= 23; i++) {
            for (let j = 0; j <= 3; j++) {
                let add = j * 15
                let string = add.toString()
                let min = string.padStart(2, "0")
                let hour = i.toString().padStart(2, "0")
                if (hour !== "00" || min !== "00") {    
                    let obj = { label: `${hour}:${min}`, value: `${hour}:${min}` }
                    hours.push(obj);
                }
            }
        }
        setEstimation(hours)
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
    return (
        <Modal {...props} title="New Task" size={800}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item sm={3} >
                        <Autocomplete
                            options={estimation}
                            onChange={(event, newValue) => {
                                console.log(newValue)
                                formik.setFieldValue("estimation", newValue && newValue.value);
                            }}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField {...params} label="Duration"
                                name="estimation"
                                id="estimation"
                                onChange={formik.handleChange}
                                error={formik.touched.estimation && Boolean(formik.errors.estimation)}
                            helperText={formik.touched.estimation && formik.errors.estimation} 
                            />
                            }
                            sx={{ fontSize: "5px", mb: 1, width: '100%' }}
                            size='small'
                        />
                    </Grid>
                    <Grid item sm={3} >
                        <Autocomplete
                            options={projectList}
                            getOptionLabel={(option) => option.name}
                            onChange={(event, newValue) => {
                                formik.setFieldValue("project", newValue && newValue.id);
                            }}
                            renderInput={(params) => <TextField {...params} label="Project"
                                name="project"
                                id="project"
                                onChange={formik.handleChange}
                                error={formik.touched.project && Boolean(formik.errors.project)}
                            helperText={formik.touched.project && formik.errors.project}
                            />}
                            sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                            size='small'

                        />
                    </Grid>
                    <Grid item sm={3} >
                        <Autocomplete
                            options={BillableOptions}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => {
                                formik.setFieldValue("billable", newValue && newValue.value);
                            }}
                            renderInput={(params) => <TextField {...params} label="Billable"
                                name="billable"
                                id="billable"
                                onChange={formik.handleChange}
                                error={formik.touched.billable && Boolean(formik.errors.billable)}
                            helperText={formik.touched.billable && formik.errors.billable}
                            />}
                            sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                            size='small'

                        />
                    </Grid>
                    <Grid item sm={3} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                onChange={(value) => {
                                    formik.setFieldValue("date", value);
                                }}
                                value={formik.values.date}
                                format="dd-MM-yyyy"
                                sx={{ fontSize: "8px", mb: 2, width: '100%' }}
                                maxDate={new Date()}
                                className='date-picker-input'
                                renderInput={(params) => <TextField {...params} 
                                    name="date"
                                    id="date"
                                    onChange={formik.handleChange}
                                />}

                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>

                < Grid item sm={12}  >
                    <TextField
                        className={style.title}
                        id="standard-error-helper-text"
                        name="title"
                        type="text"
                        label="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                          helperText={formik.touched.title && formik.errors.title}
                        size="small"
                    />
                </Grid>
                < Grid item sm={12}  >
                    <TextField label="Description"
                        name="description"
                        type="text"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        multiline rows={5} className={style.description}></TextField>
                </Grid>
                < Grid item xs={12} md={4} textAlign="end" mr={2} >
                    <Button variant="contained" type="submit" >Submit</Button>
                </Grid>
            </form>
        </Modal>
    )
}

export default NewTask