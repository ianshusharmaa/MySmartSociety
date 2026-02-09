import React, { useState, useEffect } from 'react';
import { showToast } from '../../utils/notifications';
import { getEvents, createContributionOrder, contributeToEvent } from '../../services/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaymentIcon from '@mui/icons-material/Payment';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchEvents();
    loadRazorpayScript();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await getEvents();
      setEvents(data);
    } catch (error) {
      showToast('Failed to fetch events', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleContribute = async (event) => {
    if (!amount || amount < 1) {
      showToast('Please enter a valid amount', 'warning');
      return;
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        showToast('Failed to load payment gateway', 'error');
        return;
      }

      // Create order
      const { data: orderData } = await createContributionOrder(event._id, {
        amount: parseInt(amount, 10),
      });

      const options = {
        key: orderData.keyId,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Smart Society',
        description: `Contribution for ${event.title}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            await contributeToEvent(event._id, {
              amount: parseInt(amount),
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            showToast('Contribution successful!', 'success');
            setSelectedEvent(null);
            setAmount('');
            fetchEvents();
          } catch (error) {
            showToast('Payment verification failed', 'error');
          }
        },
        theme: {
          color: '#1a73e8',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to initiate payment';
      showToast(msg, 'error');
    }
  };

  const getProgressPercentage = (event) => {
    return Math.min((event.collectedAmount / event.targetAmount) * 100, 100);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={4}>
        {/* Header */}
        <Typography variant="h4" fontWeight={800} sx={{ color: '#1f2937' }}>
          Society Events & Fundraisers
        </Typography>

        {/* Events List */}
        {events.length === 0 ? (
          <Card sx={{ bgcolor: '#f0f2f5', border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <CalendarMonthIcon sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#6b7280' }}>
                No Events Found
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} md={6} key={event._id}>
                <Card
                  sx={{
                    height: '100%',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': { boxShadow: 3 },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={2}>
                      {/* Header */}
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937', flex: 1 }}>
                          {event.title}
                        </Typography>
                        <Chip
                          label={event.category.replace('-', ' ')}
                          sx={{
                            bgcolor: '#3b82f6',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        />
                      </Stack>

                      {/* Description */}
                      <Typography variant="body2" sx={{ color: '#4b5563' }}>
                        {event.description}
                      </Typography>

                      {/* Dates */}
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CalendarMonthIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          {new Date(event.startDate).toLocaleDateString('en-GB')} -{' '}
                          {new Date(event.endDate).toLocaleDateString('en-GB')}
                        </Typography>
                      </Stack>

                      {/* Progress Section */}
                      <Box sx={{ bgcolor: '#f0f2f5', p: 1.5, borderRadius: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <TrendingUpIcon sx={{ fontSize: 16, color: '#3b82f6' }} />
                            <Typography variant="caption" fontWeight={700} sx={{ color: '#6b7280' }}>
                              Fundraiser Progress
                            </Typography>
                          </Stack>
                          <Typography variant="caption" fontWeight={700} sx={{ color: '#1a73e8' }}>
                            {getProgressPercentage(event).toFixed(1)}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={getProgressPercentage(event)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: '#e5e7eb',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#3b82f6',
                            },
                          }}
                        />
                        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                          <Typography variant="caption" sx={{ color: '#1f2937', fontWeight: 700 }}>
                            ₹{event.collectedAmount.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                            ₹{event.targetAmount.toLocaleString()}
                          </Typography>
                        </Stack>
                      </Box>

                      {/* Contribute Form or Button */}
                      {selectedEvent?._id === event._id ? (
                        <Stack spacing={1.5} sx={{ mt: 'auto' }}>
                          <TextField
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            inputProps={{ min: 1 }}
                            size="small"
                            fullWidth
                          />
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="outlined"
                              fullWidth
                              onClick={() => {
                                setSelectedEvent(null);
                                setAmount('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              fullWidth
                              onClick={() => handleContribute(event)}
                              startIcon={<PaymentIcon />}
                              sx={{
                                bgcolor: '#3b82f6',
                                color: 'white',
                                fontWeight: 700,
                                '&:hover': { bgcolor: '#2563eb' },
                              }}
                            >
                              Pay Now
                            </Button>
                          </Stack>
                        </Stack>
                      ) : (
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => setSelectedEvent(event)}
                          startIcon={<PaymentIcon />}
                          sx={{
                            bgcolor: '#3b82f6',
                            color: 'white',
                            fontWeight: 700,
                            '&:hover': { bgcolor: '#2563eb' },
                            mt: 'auto',
                          }}
                        >
                          Contribute
                        </Button>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
};

export default Events;
