import { useCallback, useEffect, useState } from 'react';

import { Autocomplete, Box, Button, Stack, Grid, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import axios from '@/utils/axios'
import { toast } from "react-toastify";

import { YYYYMMDD } from "@/utils/common";
import style from './style.module.css'
import Modal from '../Modal'


const EditTask = (props) => {
    const { authToken } = useSelector((state) => state.auth)
    const [projectList, setProjectList] = useState([]);
    const [estimations, setEstimations] = useState([])
    const [viewData, setViewData] = useState({});

    const BillableOptions = [
        { label: 'Billable', value: "billable" },
        { label: 'Non-Billable', value: "non billable" },
    ];

    const validationSchema = Yup.object({
        project: Yup.object().required('Project is required'),
        estimation: Yup.object().required('Duration is required'),
        billable: Yup.object().required('Billable is required'),
        title: Yup.string().required('Title is required')
    });

    const formik = useFormik({
        initialValues: {
            date: new Date(),
            project: null,
            estimation: null,
            billable: null,
            title: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: (value) => handleSubmit(value)
    });

    useEffect(() => {
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
        setEstimations(hours)
    }, [])

    useEffect(() => {
        if (props.open)
            getProjectList();
        else
            formik.resetForm()
    }, [props.open])

    useEffect(() => {
        if (props.open) {
            setViewData({});
            getData();
        }
    }, [props.open])

    const getData = useCallback((id) => {
        if (props.data) {
            const headers = {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + authToken
            };
            axios
                .post(`/api/timesheet`, { id: props.data.timesheet_id }, {
                    headers: headers,
                })
                .then((response) => {
                    if (response.data.flag) {
                        const { timesheet_date, project, timesheet_estimation, timesheet_billable_type, timesheet_title, timesheet_description } = response.data.data;

                        formik.setFieldValue("date", new Date(timesheet_date))
                        formik.setFieldValue("project", project)
                        formik.setFieldValue("estimation", estimations.filter(v => v.value == timesheet_estimation)[0])
                        formik.setFieldValue("billable", BillableOptions.filter(v => v.value == timesheet_billable_type)[0])
                        formik.setFieldValue("title", timesheet_title)
                        formik.setFieldValue("description", timesheet_description)

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

    const handleSubmit = (value) => {
        const userData = {
            id: viewData.timesheet_id,
            project_id: value.project.project_id,
            title: value.title,
            description: value.description,
            date: YYYYMMDD(value.date),
            billable: value.billable.value,
            estimation: value.estimation.value
        }
        const headers = {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
        };
        axios.post("/api/timesheet/update", userData, {
            headers: headers,
        })
            .then((response) => {
                if (response.data.flag) {
                    toast.success(response.data.message);
                    props.setOpen(false)
                    props.filterList()
                    formik.resetForm()
                    setViewData({});
                } else {
                    toast.error(response.data.message)
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

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

    return (
        <Modal {...props} title="Edit Task" size={800}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                onChange={(value) => {
                                    formik.setFieldValue("date", value);
                                }}
                                value={formik.values.date}
                                format="dd-MM-yyyy"
                                sx={{ fontSize: "8px", width: '100%', minHeight: '65px' }}
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
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            options={projectList}
                            getOptionLabel={(option) => option.project_name}
                            value={formik.values.project}
                            renderInput={(params) => <TextField {...params} label="Project"
                                error={formik.touched.project && Boolean(formik.errors.project)}
                                helperText={formik.touched.project && formik.errors.project} />}
                            onChange={(event, newValue) => {
                                formik.setFieldValue("project", newValue);
                            }}
                            sx={{ fontSize: "8px", minHeight: '65px' }}
                            size='small'

                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            options={estimations}
                            getOptionLabel={(option) => option.label}
                            value={formik.values.estimation}
                            renderInput={(params) => <TextField {...params} label="Duration"
                                error={formik.touched.estimation && Boolean(formik.errors.estimation)}
                                helperText={formik.touched.estimation && formik.errors.estimation} />}
                            onChange={(event, newValue) => {
                                formik.setFieldValue("estimation", newValue);
                            }}
                            sx={{ fontSize: "5px", mb: 1, minHeight: '65px' }}
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            options={BillableOptions}
                            getOptionLabel={(option) => option.label}
                            value={formik.values.billable}
                            renderInput={(params) => <TextField {...params} label="Billable"
                                error={formik.touched.billable && Boolean(formik.errors.billable)}
                                helperText={formik.touched.billable && formik.errors.billable} />}
                            onChange={(event, newValue) => {
                                formik.setFieldValue("billable", newValue);
                            }}
                            sx={{ fontSize: "8px", minHeight: '65px' }}
                            size='small'

                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
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
                        style={{ minHeight: '65px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Description"
                        name="description"
                        type="text"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        multiline rows={5} className={style.description}></TextField>
                </Grid>
                <Grid item xs={12} md={4} textAlign="end" mr={2}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "end",
                        padding: "10px",
                    }} >
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="success" type="submit">Save</Button>
                            <Button variant="outlined" color="error" onClick={() => props.setOpen(false)} >Cancel</Button>
                        </Stack>
                    </Box>
                </Grid>
            </form>
        </Modal>
    )
}

export default EditTask