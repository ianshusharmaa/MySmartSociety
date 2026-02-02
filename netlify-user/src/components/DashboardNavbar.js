import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../context/AuthContext';

const DashboardNavbar = ({ onOpenNav }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onOpenNav}
          sx={{ display: { md: 'none' }, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
          My Society Resident
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Stack direction="row" spacing={2} alignItems="center">
            {user?.name && (
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user.name}
              </Typography>
            )}
            {user?.role && (
              <Chip
                size="small"
                color="primary"
                label={user.role.toUpperCase()}
              />
            )}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
