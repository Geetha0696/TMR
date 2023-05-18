import React, { Fragment } from 'react'
import Header from './Header'
import { useRouter } from 'next/router'
import { Toolbar } from '@mui/material'

export default function Layout({ children, ...rest }) {
    const {pathname}=useRouter()
    return (
        <Fragment>
            {(( pathname === "/") || ( pathname === "/forgotpassword")  || ( pathname === "/resetpassword")) ? "" : <div>
            <Header {...rest} /><Toolbar/></div>}
             {children}
        </Fragment>
    )
}
