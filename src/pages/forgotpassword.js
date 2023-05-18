import { Box, Button, Grid, Paper,TextField, Typography } from '@mui/material'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Style from '../styles/login.module.css'
import { useRouter } from 'next/router';
const ForgotPassword = () => {
  const router=useRouter()
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
    onSubmit: (values) => {
     console.log(values)
     router.push('/')
    },
  });
  
  return (
    <Box  className={Style.forgotPassword}>
    <Paper elevation={4} >
    <Grid container >
    <Grid item sm={5} className={Style.GridImage2}>
    <img className={Style.GridImage}  src="	https://kiranworkspace.com/demo/projects/code-snippets/login/simple-login-form/img/welcome.svg"/>
    <Typography component='h4' variant='h4' >Welcome back</Typography>
    <Typography component='p' variant='p' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, asperiores!</Typography>
    </Grid>
    <Grid item sm={7} className={Style.loginpage}>
    <form className={Style.validateform} onSubmit={formik.handleSubmit}>
      <Typography component='h3' variant='h4'className={Style.login} >Forgot Password</Typography>
      <Typography component='p' variant='p'className={Style.textField} >Email</Typography>
        <TextField
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          size="small"
        />
       
        <Button color="primary" variant="contained"  className={Style.sendotp} fullWidth type="submit" >
          SEND OTP
        </Button>
      </form>
    </Grid>
  </Grid>
  </Paper>
  </Box>

  )
}

export default ForgotPassword;