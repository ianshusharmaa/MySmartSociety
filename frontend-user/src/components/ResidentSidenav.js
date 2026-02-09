import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import residentRoutes from '../routes/residentRoutes';

const drawerWidth = 260;

const ResidentSidenav = ({ mobileOpen, onClose }) => {
  const drawerWidth = 260;
  
  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 2, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <HomeIcon color="primary" />
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            My Society
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Resident Portal
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List sx={{ px: 1, py: 1 }}>
        {residentRoutes.map((route) => (
          <ListItem key={route.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={route.path}
              sx={{
                borderRadius: 2,
                px: 2,
                '&.active': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'inherit',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          MySmartSociety v1.0
        </Typography>
        <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 0.5, fontWeight: 600 }}>
          Developed by Anshu Sharma
        </Typography>
      </Box>
    </Box>
  );

  return (
    <nav>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>
    </nav>
  );
};

export default ResidentSidenav;
export { drawerWidth };
