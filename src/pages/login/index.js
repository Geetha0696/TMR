import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '@/utils/axios'
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setToken, setUserInfo } from '@/store/authSlice'

import Layout from "@/component/Layout/NonAuth/index"
import Style from '@/styles/auth.module.css'


export default function Login() {

  const router = useRouter()
  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    email: Yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup
      .string('Enter your password')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (value) => handleSubmit(value)
  });

  const handleSubmit = (value) => {
    const userData = {
      email: value.email,
      password: value.password
    }
    axios.post("/api/auth/login", userData)
      .then((response) => {
        if (response.data.flag) {

          dispatch(setUserInfo(response.data.data));
          dispatch(setToken(response.data.data.token));

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
    <>
      <Layout title="Login">
        <div className='mainpage'>
          <Box className={Style.loginimage}>
            <Paper elevation={4} >
              <Grid container >
                <Grid item sm={5} className={Style.GridImage2}>
                  <Image className={Style.GridImage} alt="image" src="https://kiranworkspace.com/demo/projects/code-snippets/login/simple-login-form/img/welcome.svg" width="100" height="100" />
                  <Typography component='h4' variant='h4' >Welcome back</Typography>
                  <Typography component='p' variant='p' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, asperiores!</Typography>
                </Grid>
                <Grid item sm={7} className={Style.loginpage}>
                  <form className={Style.validateform} onSubmit={formik.handleSubmit}>
                    <Typography component='h3' variant='h4' className={Style.login} >LOGIN</Typography>
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
                    <Typography component='p' variant='p' className={Style.textField} >Password</Typography>
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      size="small"
                      style={{ minHeight: '65px' }}
                    />
                    <Link href='/forgotpassword' className={Style.textField}>Forgot password?</Link>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                      Login
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </div>
      </Layout>
    </>
  )
}
