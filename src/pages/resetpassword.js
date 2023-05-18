import { Box, Button, Grid, Paper,TextField, Typography } from '@mui/material'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Style from '../styles/login.module.css'
import { useRouter } from 'next/router';
const ResetPassword = () => {
  const router=useRouter()
  const validationSchema = Yup.object({
      newpassword: Yup
      .string('Enter your password')
      .required('Password is required'),
      confirmpassword:Yup
      .string('Enter your password')
      .oneOf([Yup.ref('newpassword'), null], 'New Passwords must match')
      .required('Confirm Password is required')
  });
  const formik = useFormik({
    initialValues: {
      newpassword: '',
      confirmpassword: '',
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
      <Typography component='h3' variant='h4'className={Style.login} >Rest Password</Typography>
      <Typography component='p' variant='p'className={Style.textField} >New Password</Typography>
        <TextField
          id="password"
          name="newpassword"
          type="password"
          value={formik.values.newpassword}
          onChange={formik.handleChange}
          error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
          helperText={formik.touched.newpassword && formik.errors.newpassword}
          size="small"
        />
        <Typography component='p' variant='p'className={Style.textField} >Confirm Password</Typography>
        <TextField
          id="password"
          name="confirmpassword"
          type="password"
          value={formik.values.confirmpassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
          helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
          size="small"
        />
        <Button color="primary" className={Style.sendotp} variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Grid>
  </Grid>
  </Paper>
  </Box>

  )
}

export default ResetPassword;