import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image';

import { Container, Box, Toolbar, Tooltip, Typography, AppBar, IconButton, Menu, MenuItem, Avatar, Grid } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import axios from '@/utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { removeToken, removeUserInfo } from '@/store/authSlice'
import { toast } from "react-toastify";

import style from './style.module.css'
const pages = ['Products', 'Pricing', 'Blog'];

export default function Header(props) {

  const [anchorElNav, setAnchorElNav] = useState('');
  const [anchorElUser, setAnchorElUser] = useState('');
  const { push, pathname } = useRouter()
  const dispatch = useDispatch()
  const { authToken } = useSelector((state) => state.auth)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (pathname) => {
    if (pathname === 'dashboard') {
      push('/')
    } else if (pathname === 'timesheet') {
      push('/timesheet')
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Logout = () => {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
    }

    axios.post("/api/auth/logout", {}, config)
      .then((response) => {
        console.log(response)
        if (response.data.flag) {
          toast.success(response.data.message);
          dispatch(removeToken());
          dispatch(removeUserInfo());
          router.push('/login')
        } else {
          toast.error(response.data.message)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    push('/')
  }

  return (
    <div>
      <AppBar className={style.appbar}>
        <Container maxWidth="xl">
          <Toolbar disableGutters className={style.toolbar}>
            <Grid container>
              <Grid item xs={2} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                <Box>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                      <MenuItem  onClick={()=>handleCloseNavMenu('dashboard')}>
                        <Typography textAlign="center">Dashboard</Typography>
                      </MenuItem>
                      <MenuItem  onClick={()=>handleCloseNavMenu('timesheet')}>
                        <Typography textAlign="center">Timesheet</Typography>
                      </MenuItem>
                  </Menu>
                </Box>
              </Grid>
              <Grid item xs={8} md={1}>
                <img alt="logo" src="https://media.licdn.com/dms/image/D560BAQEAwVvg9xub0Q/company-logo_200_200/0/1683302939061?e=2147483647&v=beta&t=7moSYA7ZVjZGph5kMM-5q9O8X-VE13jL9Vfya8rrdiw" width="40" height="40" />
              </Grid>

              <Grid item xs={10} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                <Link href='/' className={`${style.menulist} ${pathname === '/' ? style.active : ''}`}><div>Dashboard</div></Link>
                <Link href='/timesheet' className={`${style.menulist} ${pathname === '/timesheet' ? style.active : ''}`}><div>Timesheet</div></Link>
              </Grid>

              <Grid item xs={1}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={Logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
