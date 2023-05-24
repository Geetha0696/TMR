import React from 'react'
import Head from 'next/head'
import { Container, Toolbar } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import Header from '../Header'
import Breadcrumps from '../Breadcrumps'
import style from '../style.module.css'
import authRoute from "./authRoute";

const Layout = ({ children, title, breadcrumbs = [] }) => {
console.log(breadcrumbs)
    return (
        <>
            <Head>
                <title>{`${process.env.app_name} - ${title}`}</title>
                <meta
                    name='description'
                    content={`${process.env.app_name} - ${title}`}
                />
                <meta name='keywords' content={title} />
            </Head>
            <Header />
            <Toolbar className={style.appbar} sx={{ background: "#f0f3fa !important" }} />
            <Container maxWidth="xl">
                <Breadcrumps breadcrumbs={breadcrumbs} />
                <ToastContainer />
                <main>{children}</main>
            </Container>
        </>
    )
}

export default authRoute(Layout);
