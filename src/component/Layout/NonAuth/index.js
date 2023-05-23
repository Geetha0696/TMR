import React from 'react'
import authRoute from "./nonAuthRoute";
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

const Layout = ({ children, title }) => {

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
            <ToastContainer />
            <main>{children}</main>
        </>
    )
}

export default authRoute(Layout);
