import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '../utils/notifications';
import { register as registerAPI } from '../services/api';
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
  Grid,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ApartmentIcon from '@mui/icons-material/Apartment';
import './Register.css';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    flatNumber: '',
    building: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);

    try {
      await registerAPI({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        flatNumber: formData.flatNumber,
        building: formData.building,
        role: 'admin'
      });

      showToast('Admin account created! Please login.', 'success');
      navigate('/login');
    } catch (error) {
      showToast(error.response?.data?.message || 'Registration failed', 'error');
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
      <Container maxWidth="md">
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
                <ApartmentIcon sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="h5" fontWeight={800}>
                Smart Society
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                <PersonAddIcon sx={{ fontSize: 18 }} />
                <Typography variant="subtitle2" fontWeight={700}>
                  Create Admin Account
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <CardContent sx={{ p: 4, background: '#ffffff' }}>
            <Stack spacing={3}>
              {/* Welcome Text */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937', mb: 1 }}>
                  Admin Registration
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Create your administrator account to manage the society
                </Typography>
              </Box>

              <Divider />

              {/* Registration Form */}
              <form onSubmit={handleSubmit} noValidate>
                <Stack spacing={2.5}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
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
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter phone number"
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Building"
                        name="building"
                        type="text"
                        value={formData.building}
                        onChange={handleChange}
                        required
                        placeholder="Building name/number"
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
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Flat Number"
                    name="flatNumber"
                    type="text"
                    value={formData.flatNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter flat number"
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

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter password (min 6 characters)"
                        variant="outlined"
                        size="small"
                        inputProps={{ minLength: 6 }}
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm password"
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
                    </Grid>
                  </Grid>

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
                      'Create Admin Account'
                    )}
                  </Button>
                </Stack>
              </form>

              <Divider />

              {/* Login Link */}
              <Typography variant="body2" sx={{ textAlign: 'center', color: '#6b7280' }}>
                Already have an admin account?{' '}
                <Link
                  to="/login"
                  className="admin-register-link"
                >
                  Login here
                </Link>
              </Typography>

              {/* Info Alert */}
              <Alert
                severity="info"
                sx={{
                  bgcolor: '#e8f0fe',
                  color: '#1a73e8',
                  border: '1px solid #1a73e8',
                  '& .MuiAlert-icon': { color: '#1a73e8' },
                }}
              >
                <Typography variant="caption" sx={{ display: 'block' }}>
                  ℹ️ This form creates an administrator account with full society management privileges.
                </Typography>
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

export default Register;
