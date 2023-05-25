import * as React from 'react';
import { useRouter } from 'next/router';
import { Breadcrumbs, Typography, Link, Stack } from '@mui/material';
import { Home, NavigateNext } from '@mui/icons-material';
import style from './style.module.css'

export default function Breadcrump({ breadcrumbs }) {
    const { pathname } = useRouter()

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
                className={style.breadcrumbs}
            >
                {pathname == '/' ?
                    <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Home sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard
                    </Typography> :
                    <Link underline="hover" color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Home sx={{ mr: 0.5 }} fontSize="inherit" />Dashboard
                    </Link>}


                {breadcrumbs.length > 0 ? breadcrumbs.map((item, index) => (
                    <div key={index}>
                        {index != breadcrumbs.length - 1 ?
                            (<Link underline="hover" color="inherit" href={item.link}>
                                {item.name}
                            </Link>) :
                            (<Typography color="text.primary">
                                {item.name}
                            </Typography>)}
                    </div>
                )) : ""}
            </Breadcrumbs>
        </Stack >
    );
}