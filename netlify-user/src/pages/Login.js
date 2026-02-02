import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/notifications';
import { AuthContext } from '../context/AuthContext';
import { login as loginAPI } from '../services/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
  Alert,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await loginAPI(formData);
      if (data.role === 'admin') {
        showToast('Admins please use the Admin Panel (opens in new tab).', 'info');
        window.open('http://localhost:3001/login', '_blank', 'noopener');
        return;
      }
      login(data);
      showToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch (error) {
      showToast(error.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            boxShadow: '0 4px 20px rgba(26, 115, 232, 0.1)',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
          }}
        >
          {/* Header with Blue Background */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1a73e8 0%, #1557c0 100%)',
              py: 4,
              px: 3,
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Stack spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PersonIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" fontWeight={800}>
                Smart Society
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                <Typography variant="subtitle2" fontWeight={700}>
                  Resident Login
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <CardContent sx={{ p: 4, background: '#ffffff' }}>
            <Stack spacing={3}>
              {/* Welcome Text */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937', mb: 1 }}>
                  Welcome Back, Resident
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Login to manage your residential needs
                </Typography>
              </Box>

              <Divider />

              {/* Login Form */}
              <form onSubmit={handleSubmit} noValidate>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="user@demo.com"
                    autoComplete="email"
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1a73e8',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1a73e8',
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1a73e8',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1a73e8',
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      bgcolor: '#1a73e8',
                      color: 'white',
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: 15,
                      '&:hover': { bgcolor: '#1557c0' },
                      '&:disabled': { bgcolor: '#ccc' },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Stack>
              </form>

              <Divider />

              {/* Account Creation Info */}
              <Alert
                severity="warning"
                sx={{
                  bgcolor: '#fffbeb',
                  color: '#92400e',
                  border: '1px solid #fcd34d',
                  '& .MuiAlert-icon': { color: '#d97706' },
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="caption" fontWeight={700} sx={{ display: 'block' }}>
                    ⚠️ Create Account
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    Contact your society administrator to create your resident account
                  </Typography>
                </Stack>
              </Alert>

              {/* Admin Link */}
              <Alert
                severity="info"
                sx={{
                  bgcolor: '#e8f0fe',
                  color: '#1a73e8',
                  border: '1px solid #1a73e8',
                  '& .MuiAlert-icon': { color: '#1a73e8' },
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    👨‍💼 Are you an admin?{' '}
                    <MuiLink
                      component="a"
                      href="http://localhost:3001/login"
                      sx={{
                        color: '#1a73e8',
                        fontWeight: 700,
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Go to Admin Panel
                    </MuiLink>
                  </Typography>
                </Stack>
              </Alert>

              {/* Demo Credentials */}
              <Alert
                severity="success"
                sx={{
                  bgcolor: '#f0fdf4',
                  color: '#15803d',
                  border: '1px solid #86efac',
                  '& .MuiAlert-icon': { color: '#10b981' },
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="caption" fontWeight={700} sx={{ display: 'block' }}>
                    📋 Demo Resident Credentials
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    Email: <strong>user@demo.com</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    Password: <strong>user123</strong>
                  </Typography>
                </Stack>
              </Alert>
            </Stack>
          </CardContent>
        </Card>

        {/* Footer */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#6b7280',
            mt: 3,
          }}
        >
          © 2026 MySmartSociety | All Rights Reserved
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: '#1a73e8',
            mt: 0.5,
            fontWeight: 600,
          }}
        >
          Developed by Anshu Sharma
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
