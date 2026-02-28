import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

const ResidentNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Complaints', icon: <AssignmentIcon />, path: '/complaints' },
    { label: 'Permissions', icon: <SecurityIcon />, path: '/permissions' },
    { label: 'Maintenance', icon: <BuildIcon />, path: '/maintenance' },
    { label: 'Events', icon: <EventIcon />, path: '/events' },
    { label: 'Notices', icon: <NotificationsIcon />, path: '/notices' },
    { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#ffffff', color: '#000000', boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexGrow: 1 }}>
            <Box
              component="img"
              src="/logo.png"
              alt="MySmartSociety logo"
              sx={{ width: 40, height: 40, objectFit: 'contain' }}
            />
            <Box>
              <Typography variant="h6" fontWeight={800} sx={{ color: '#1a73e8', lineHeight: 1 }}>
                MySmartSociety
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                Resident Portal
              </Typography>
            </Box>
          </Stack>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Stack direction="row" spacing={0.5} sx={{ flex: 1, justifyContent: 'center', mx: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color: '#34495e',
                    textTransform: 'capitalize',
                    fontSize: 13,
                    fontWeight: 600,
                    '&:hover': { color: '#1a73e8', backgroundColor: 'rgba(26, 115, 232, 0.1)' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}

          {/* User Info & Logout */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight={700} sx={{ color: '#1f2937' }}>
                {user?.name}
              </Typography>
              <Chip
                label={user?.role}
                size="small"
                sx={{ bgcolor: '#1a73e8', color: 'white', fontWeight: 700, fontSize: 11, mt: 0.5 }}
              />
            </Box>

            <IconButton
              onClick={handleLogout}
              sx={{ color: '#ef4444', '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' } }}
              title="Logout"
            >
              <LogoutIcon />
            </IconButton>

            {/* Mobile Menu */}
            {isMobile && (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ color: '#1a73e8' }}>
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  {navItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        handleMenuClose();
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        {item.icon}
                        <Typography>{item.label}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResidentNavbar;
