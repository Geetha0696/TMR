import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Style from '../styles/login.module.css'
import { useRouter } from 'next/router';
import axios from '../utils/axios'
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const router = useRouter()
  const validationSchema = Yup.object({
    email: Yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = (value) => {
    console.log(value)
    const userData = {
      email: value.email,
    }
    axios.post("api/auth/forgotPassword", userData)
      .then((response) => {
        if (response.data.flag) {
          toast.success(response.data.message);
          router.push('/login')
        } else {
          toast.error(response.data.message)
        }
      })
      .catch((error) => {
        console.error(error);
      });


  }

  return (
    <>
      <Box className={Style.forgotPassword}>
        <Paper elevation={4} >
          <Grid container >
            <Grid item sm={5} className={Style.GridImage2}>
              <Image className={Style.GridImage} alt="logo" src="https://kiranworkspace.com/demo/projects/code-snippets/login/simple-login-form/img/welcome.svg" width="60" height="60" />
              <Typography component='h4' variant='h4' >Welcome back</Typography>
              <Typography component='p' variant='p' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, asperiores!</Typography>
            </Grid>
            <Grid item sm={7} className={Style.loginpage}>
              <form className={Style.validateform} onSubmit={formik.handleSubmit}>
                <Typography component='h3' variant='h4' className={Style.login} >Forgot Password</Typography>
                <Typography component='p' variant='p' className={Style.textField} >Email</Typography>
                <TextField
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  size="small"
                  style={{ minHeight: '65px' }}
                />

                <Button color="primary" variant="contained" className={Style.sendotp} fullWidth type="submit" >
                  SEND MAIL
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>

      </Box>
    </>

  )
}

export default ForgotPassword;