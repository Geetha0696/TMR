import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import style from '../Layout/Header.module.scss'
import { useRouter } from 'next/router';
import SnackBar from '../SnackBar';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard'];
export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState('');
  const [anchorElUser, setAnchorElUser] = useState('');
  const [snackbarState, setSnackbarState] = useState({ open: false });
  const { push, pathname } = useRouter()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (pathname) => {
    if (pathname === 'profile') {
      push('/profile')
    } else if (pathname === 'Tasks') {
      push('/task')
    } else if (pathname === 'Plan') {
      push('/plan')
    } else if (pathname === 'Report') {
      push('/report')
    } else if (pathname === 'Contacts') {
      push('/contacts')
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Logout =() => {
    setSnackbarState({
      open: true,
      message:"Logout successfully",
      severity: "success",
    }); 
    push('/')
  }

  return (
    <React.Fragment>
      <AppBar className={style.appbar}>
        <Container maxWidth="xl" className={style.container}>
          <Toolbar disableGutters className={style.toolbar}>
            <img src='	https://scoroassets.scoro.com/gfx/scoro_logo.svg' width='60px' />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', paddingLeft: "44px" } }}>
              <Button
                onClick={() => handleCloseNavMenu('profile')}
                className={`${style.boolean} ${pathname === '/profile' ? style.active : ''}`}
              >
                Projects
              </Button>
              <Button
                onClick={() => handleCloseNavMenu('Tasks')}
                className={`${style.boolean} ${pathname === '/task' ? style.active : ''}`}
              >
                Task
              </Button>
              <Button
                onClick={() => handleCloseNavMenu('Plan')}
                className={`${style.boolean} ${pathname === '/' ? style.active : ''}`}
              >
                Plan
              </Button>
              <Button
                onClick={() => handleCloseNavMenu('Report')}
                className={`${style.boolean} ${pathname === '/' ? style.active : ''}`}
              >
                Report
              </Button>
              <Button
                onClick={() => handleCloseNavMenu('Contacts')}
                className={`${style.boolean} ${pathname === '/' ? style.active : ''}`}
              >
                Contacts
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <SnackBar
        open={snackbarState.open}
        message={snackbarState.message}
        severity={snackbarState.severity}
        onClose={()=>setSnackbarState({ open: false })}
      />
    </React.Fragment>
  );
}
