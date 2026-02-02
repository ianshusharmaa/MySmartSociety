import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PaymentsIcon from '@mui/icons-material/Payments';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CampaignIcon from '@mui/icons-material/Campaign';
import EventIcon from '@mui/icons-material/Event';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LaunchIcon from '@mui/icons-material/Launch';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <ReportProblemIcon fontSize="large" />, title: 'Complaints', desc: 'Manage & resolve issues', color: '#ef4444' },
    { icon: <VpnKeyIcon fontSize="large" />, title: 'Permissions', desc: 'Control access rights', color: '#f59e0b' },
    { icon: <PaymentsIcon fontSize="large" />, title: 'Maintenance', desc: 'Track payments & requests', color: '#3b82f6' },
    { icon: <CampaignIcon fontSize="large" />, title: 'Notices', desc: 'Broadcast updates', color: '#8b5cf6' },
    { icon: <EventIcon fontSize="large" />, title: 'Events', desc: 'Organize activities', color: '#10b981' },
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
              Admin Panel - Manage Everything in One Place
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: '#7f8c8d', mb: 4 }}>
              Complete control over your residential community with powerful admin tools
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
                Admin Login
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="http://localhost:3000/login"
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
                Resident Panel
              </Button>
            </Stack>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 2 }} key={index}>
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
