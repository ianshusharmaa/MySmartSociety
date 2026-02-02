import React, { useState } from 'react';
import { Box } from '@mui/material';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <DashboardNavbar onOpenNav={handleDrawerToggle} />
        <Sidenav mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: { xs: 1, md: 2 },
            pb: { xs: 1, md: 2 },
            pr: { xs: 1, md: 1.5 },
            pl: { xs: 1, md: 1.5 },
            mt: { xs: 8, md: 9 },
            ml: { md: '80px' },
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout;
