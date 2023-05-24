import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image';

import { Container, Box, Toolbar, Tooltip, Typography, AppBar, IconButton, Menu, MenuItem, Avatar, Grid, Drawer, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Menu as MenuIcon, Dashboard, GridOn } from '@mui/icons-material';
import axios from '@/utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { removeToken, removeUserInfo } from '@/store/authSlice'
import { toast } from "react-toastify";

import style from './style.module.css'

export default function Header(props) {

  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState('');
  const { push, pathname } = useRouter()
  const dispatch = useDispatch()
  const { authToken } = useSelector((state) => state.auth)

  const pages = [{
    name: 'Dashboard',
    link: '/',
    icon: <Dashboard fontSize="20px" />
  }, {
    name: 'Timesheet',
    link: '/timesheet',
    icon: <GridOn fontSize="20px" />
  }];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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
          <Toolbar className={style.toolbar}>
            <Grid container>
              <Grid item xs={2} sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => setAnchorElNav(true)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor='left'
                  open={anchorElNav}
                  onClose={() => setAnchorElNav(false)}
                >
                  <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setAnchorElNav(false)}
                    onKeyDown={() => setAnchorElNav(false)}
                  >
                    <List>
                      {pages.map((page, key) => (
                        <ListItem key={key} disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              {page.icon}
                            </ListItemIcon>
                            <Link href={page.link} className={`${style.menulist} ${pathname === page.link ? style.active : ''}`} onClick={() => setAnchorElNav(false)}>{page.name}</Link>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </Grid>
              <Grid item xs={8} md={1}>
                <Image alt="logo" src="/next.svg" width="60" height="60" />
              </Grid>

              <Grid item xs={10} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>

                {pages.map((page, key) => (
                  <Link key={key} href={page.link} className={`${style.menulist} ${pathname === page.link ? style.active : ''}`}>{page.icon}<span style={{ marginLeft: '5px' }}>{page.name}</span></Link>
                ))}
              </Grid>

              <Grid item xs={1} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
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
