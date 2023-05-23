import { Box, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import React from 'react'
import style from './style.module.scss'
import BasicTable from '@/component/TaskList/TaskList';
import Layout from "@/component/Layout/Auth/index"

const Timesheet = () => {

    const breadcrumbs = [{
        name: 'Timesheet',
        link: ''
    }]

    return (
        <Layout title="Timesheet" breadcrumbs={breadcrumbs}>
            <Box component="div" className={style.taskpage} >
                <BasicTable />
            </Box>
        </Layout>

    )
}


export default Timesheet