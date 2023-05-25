import React from 'react'
import { Box } from '@mui/material'
import BasicTable from '@/component/TaskList/TaskList';
import Layout from "@/component/Layout/Auth/index"

const Timesheet = () => {

    const breadcrumbs = [{
        name: 'Timesheet',
        link: ''
    }]

    return (
        <Layout title="Timesheet" breadcrumbs={breadcrumbs}>
            <Box component="div" >
                <BasicTable />
            </Box>
        </Layout>

    )
}


export default Timesheet