import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LaunchIcon from '@mui/icons-material/Launch';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <AssignmentIcon fontSize="large" />, title: 'Complaints', desc: 'Report & track issues easily', color: '#ef4444' },
    { icon: <DescriptionIcon fontSize="large" />, title: 'Permissions', desc: 'Request & manage access', color: '#f59e0b' },
    { icon: <BuildIcon fontSize="large" />, title: 'Maintenance', desc: 'Schedule & monitor requests', color: '#3b82f6' },
    { icon: <NotificationsIcon fontSize="large" />, title: 'Notices', desc: 'Stay updated with news', color: '#8b5cf6' },
    { icon: <SecurityIcon fontSize="large" />, title: 'Secure', desc: 'Protected & encrypted', color: '#10b981' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: '#ffffff', py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={8} alignItems="center">
          {/* Header */}
          <Box sx={{ textAlign: 'center', color: '#1a73e8' }}>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
              <ApartmentIcon sx={{ fontSize: 64 }} />
              <Typography variant="h2" fontWeight={800} sx={{ color: '#1a73e8' }}>
                MySmartSociety
              </Typography>
            </Stack>
            <Typography variant="h5" sx={{ mb: 2, color: '#34495e' }}>
              Manage Everything in One Place
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: '#7f8c8d', mb: 4 }}>
              Handle complaints, permissions, maintenance & stay updated with your residential community
            </Typography>

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  bgcolor: '#1a73e8',
                  color: 'white',
                  px: 5,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#1557c0', transform: 'scale(1.05)' },
                }}
                startIcon={<DashboardIcon />}
              >
                Resident Login
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="http://localhost:3001/login"
                target="_blank"
                sx={{
                  borderColor: '#1a73e8',
                  color: '#1a73e8',
                  px: 5,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 700,
                  '&:hover': { borderColor: '#1557c0', bgcolor: '#e8f0fe' },
                }}
                endIcon={<LaunchIcon />}
              >
                Admin Panel
              </Button>
            </Stack>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={3} sx={{ width: '100%' }}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Stack spacing={2} alignItems="center" textAlign="center">
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          bgcolor: feature.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 2,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {feature.desc}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="caption" sx={{ display: 'block', color: '#9ca3af' }}>
              © 2026 MySmartSociety | All Rights Reserved
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: '#1a73e8', mt: 0.5, fontWeight: 600 }}>
              Developed by Anshu Sharma
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: '#9ca3af', mt: 0.5 }}>
              anshukumar.sharma.btechcse@ghrua.edu.in
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Welcome;
