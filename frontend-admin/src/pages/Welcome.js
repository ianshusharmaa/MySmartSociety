import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Stack } from '@mui/material';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box
      className="welcome-root"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: 'url(/welcomepage.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="sm" sx={{ pt: '200px' }}>
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 2, md: 3 },
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                px: 5,
                py: 1.4,
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 999,
                bgcolor: '#1a73e8',
                boxShadow: '0 12px 30px rgba(26, 115, 232, 0.35)',
                '&:hover': { bgcolor: '#1557c0', transform: 'translateY(-1px)' },
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Welcome;
