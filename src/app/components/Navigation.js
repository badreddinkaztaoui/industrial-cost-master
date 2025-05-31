"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  Avatar, 
  Button, 
  Tooltip, 
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout, getCurrentUser, isAuthenticated } from '../lib/auth';

const pages = [
  { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { title: 'Reporting', path: '/reporting', icon: <AssessmentIcon /> },
  { title: 'Collaboration', path: '/collaboration', icon: <GroupsIcon /> },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in using auth.js utility
    if (isAuthenticated()) {
      setUser(getCurrentUser());
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    router.push(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout(); // This will handle token removal and redirect
    handleCloseUserMenu();
  };

  // If we're on the home page or login page, don't show the navigation
  if (pathname === '/' || pathname === '/auth/login') {
    return null;
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
              IndustrialCostMaster
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  onClick={() => handleNavigation(page.path)}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'block',
                    borderBottom: pathname === page.path ? '2px solid white' : 'none'
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <>
                  <Tooltip title="Options utilisateur">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user.name}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
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
                    <MenuItem>
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <Box>
                        <Typography textAlign="left">{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                        <Chip 
                          size="small" 
                          label={user.role} 
                          color={user.role === 'admin' ? 'error' : 'primary'}
                          sx={{ mt: 1, fontSize: '0.7rem' }} 
                        />
                      </Box>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <Typography textAlign="center">Déconnexion</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button color="inherit" onClick={() => router.push('/auth/login')}>
                  Se connecter
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            <ListItem>
              <Typography variant="h6" sx={{ py: 2 }}>
                IndustrialCostMaster
              </Typography>
            </ListItem>
            <Divider />
            {pages.map((page) => (
              <ListItem 
                button 
                key={page.title} 
                onClick={() => handleNavigation(page.path)}
                selected={pathname === page.path}
              >
                <ListItemIcon>
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          {user && (
            <List>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Déconnexion" />
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
}
