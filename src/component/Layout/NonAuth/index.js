import React from 'react'
import authRoute from "./nonAuthRoute";
import Head from 'next/head'

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
            <main>{children}</main>
        </>
    )
}

export default authRoute(Layout);
