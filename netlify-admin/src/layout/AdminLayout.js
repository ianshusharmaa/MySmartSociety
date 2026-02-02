import React, { useState } from 'react';
import { Box } from '@mui/material';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidenav, { drawerWidth } from '../components/Sidenav';

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <DashboardNavbar onOpenNav={handleDrawerToggle} />
      <Sidenav mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          pr: { xs: 2, md: '1cm' },
          pl: { xs: 2, md: 0 },
          mt: { xs: 8, md: 9 },
          ml: { md: '80px' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
