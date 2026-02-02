import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PaymentsIcon from '@mui/icons-material/Payments';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CampaignIcon from '@mui/icons-material/Campaign';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <ReportProblemIcon fontSize="large" />, title: 'Complaint Management', color: '#ef4444' },
    { icon: <PaymentsIcon fontSize="large" />, title: 'Maintenance Tracking', color: '#10b981' },
    { icon: <VpnKeyIcon fontSize="large" />, title: 'Permission System', color: '#f59e0b' },
    { icon: <CampaignIcon fontSize="large" />, title: 'Notices & Updates', color: '#3b82f6' },
    { icon: <EventIcon fontSize="large" />, title: 'Event Organization', color: '#8b5cf6' },
    { icon: <GroupIcon fontSize="large" />, title: 'Community Management', color: '#06b6d4' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: '#ffffff', py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={6} alignItems="center">
          <Box sx={{ textAlign: 'center', color: '#1a73e8' }}>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
              <ApartmentIcon sx={{ fontSize: 64 }} />
              <Typography variant="h2" fontWeight={800} sx={{ color: '#1a73e8' }}>
                MySmartSociety
              </Typography>
            </Stack>
            <Typography variant="h5" sx={{ mb: 2, color: '#34495e' }}>
              Building Communities, Creating Harmony
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', color: '#7f8c8d' }}>
              Manage your residential community with ease. Handle complaints, maintenance payments,
              permissions, notices, and events all in one place.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.95)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: 8 },
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
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" fontWeight={700}>
                        {feature.title}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: '#1a73e8',
                color: 'white',
                px: 5,
                py: 1.5,
                fontSize: 18,
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
              onClick={() => navigate('/register')}
              sx={{
                borderColor: '#1a73e8',
                color: '#1a73e8',
                px: 5,
                py: 1.5,
                fontSize: 18,
                fontWeight: 700,
                '&:hover': { borderColor: '#1557c0', bgcolor: '#e8f0fe' },
              }}
            >
              New Registration
            </Button>
          </Stack>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="caption" sx={{ display: 'block', color: '#7f8c8d' }}>
              © 2026 MySmartSociety | All Rights Reserved
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: '#1a73e8', mt: 0.5, fontWeight: 600 }}>
              Developed by Anshu Sharma
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: '#7f8c8d', mt: 0.5 }}>
              anshukumar.sharma.btechcse@ghrua.edu.in
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Welcome;
