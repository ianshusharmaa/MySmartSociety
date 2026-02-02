import React, { useState, useEffect } from 'react';
import { showToast } from '../../utils/notifications';
import { getMaintenanceRecords, createMaintenanceOrder, verifyMaintenancePayment } from '../../services/api';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import BuildIcon from '@mui/icons-material/Build';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Maintenance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
    loadRazorpayScript();
  }, []);

  const fetchRecords = async () => {
    try {
      const { data } = await getMaintenanceRecords();
      setRecords(data);
    } catch (error) {
      showToast('Failed to fetch maintenance records', 'error');
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

  const handlePayment = async (record) => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        showToast('Failed to load payment gateway', 'error');
        return;
      }

      // Create order
      const { data: orderData } = await createMaintenanceOrder(record._id);

      const options = {
        key: orderData.keyId,
        amount: orderData.amount * 100,
        currency: orderData.currency,
        name: 'Smart Society',
        description: `Maintenance Payment - ${record.period.month}/${record.period.year}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // Verify payment
            await verifyMaintenancePayment(record._id, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            showToast('Payment successful!', 'success');
            fetchRecords();
          } catch (error) {
            showToast('Payment verification failed', 'error');
          }
        },
        prefill: {
          name: record.resident?.name,
          email: record.resident?.email,
          contact: record.resident?.phone,
        },
        theme: {
          color: '#1a73e8',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      showToast('Failed to initiate payment', 'error');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      paid: '#10b981',
      overdue: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
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
          Maintenance Payments
        </Typography>

        {/* Maintenance Records */}
        {records.length === 0 ? (
          <Card sx={{ bgcolor: '#f0f2f5', border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <BuildIcon sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#6b7280' }}>
                No Maintenance Records Found
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {records.map((record) => (
              <Grid item xs={12} sm={6} md={4} key={record._id}>
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
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937' }}>
                          {new Date(0, record.period.month - 1).toLocaleString('default', {
                            month: 'long',
                          })}{' '}
                          {record.period.year}
                        </Typography>
                        <Chip
                          label={getStatusLabel(record.status)}
                          sx={{
                            bgcolor: getStatusColor(record.status),
                            color: 'white',
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        />
                      </Stack>

                      {/* Amount */}
                      <Box sx={{ bgcolor: 'rgba(26, 115, 232, 0.1)', p: 2, borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                          Amount Due
                        </Typography>
                        <Typography variant="h4" fontWeight={800} sx={{ color: '#1a73e8' }}>
                          ₹{record.amount}
                        </Typography>
                      </Box>

                      {/* Details */}
                      <Box>
                        <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                          Due Date
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1f2937' }}>
                          {new Date(record.dueDate).toLocaleDateString('en-GB')}
                        </Typography>
                      </Box>

                      {record.paymentDate && (
                        <Box>
                          <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                            Paid On
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1f2937' }}>
                            {new Date(record.paymentDate).toLocaleDateString('en-GB')}
                          </Typography>
                        </Box>
                      )}

                      {record.transactionId && (
                        <Box>
                          <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 600 }}>
                            Transaction ID
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#4b5563', display: 'block', wordBreak: 'break-all' }}>
                            {record.transactionId}
                          </Typography>
                        </Box>
                      )}

                      {/* Action Button */}
                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        {record.status === 'pending' || record.status === 'overdue' ? (
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handlePayment(record)}
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
                        ) : (
                          <Button
                            variant="outlined"
                            fullWidth
                            disabled
                            startIcon={<ReceiptIcon />}
                            sx={{ fontWeight: 700 }}
                          >
                            Download Receipt
                          </Button>
                        )}
                      </Box>
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

export default Maintenance;
