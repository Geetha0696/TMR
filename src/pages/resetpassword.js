import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Style from '../styles/auth.module.css'
import { useRouter } from 'next/router';
import axios from '../utils/axios'
import { toast } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const [activation, setActivation] = useState('')
  useEffect(() => {
    const token = router.query.token;
    const key = router.query.key;
    if (token && key) {
      setActivation({ token: token, key: key })
    }

  }, [router]);
  const validationSchema = Yup.object({
    newpassword: Yup
      .string('Enter your password')
      .required('Password is required'),
    confirmpassword: Yup
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
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = (value) => {
    const userData = {
      token: activation.token,
      key: activation.key,
      password: value.newpassword,
      confirmPassword: value.confirmpassword
    }
    axios.post("api/auth/resetPassword", userData)
      .then((response) => {
        if (response.data.flag) {
          toast.success(response.data.message);
          router.push('/')
        } else {
          toast.error(response.data.message)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Box className={Style.forgotPassword}>
      <Paper elevation={4} >
        <Grid container >
          <Grid item sm={5} sx={{ display: { xs: 'none', sm: 'block' } }} className={Style.GridImage2}>
            <img className={Style.GridImage} src="	https://kiranworkspace.com/demo/projects/code-snippets/login/simple-login-form/img/welcome.svg" />
            <Typography component='h4' variant='h4' >Welcome back</Typography>
            <Typography component='p' variant='p' >TM</Typography>
          </Grid>
          <Grid item  sm={7} xs={12} className={Style.loginpage}>
            <form className={Style.validateform} onSubmit={formik.handleSubmit}>
              <Typography component='h3' variant='h4' className={Style.login} >Rest Password</Typography>
              <Typography component='p' variant='p' className={Style.textField} >New Password</Typography>
              <TextField
                id="password"
                name="newpassword"
                type="password"
                value={formik.values.newpassword}
                onChange={formik.handleChange}
                error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                helperText={formik.touched.newpassword && formik.errors.newpassword}
                size="small"
                style={{ minHeight: '65px' }}
              />
              <Typography component='p' variant='p' className={Style.textField} >Confirm Password</Typography>
              <TextField
                id="password"
                name="confirmpassword"
                type="password"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                size="small"
                style={{ minHeight: '65px' }}
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