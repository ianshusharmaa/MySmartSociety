import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMaintenanceRecords, createMaintenanceOrder, verifyMaintenancePayment } from '../../services/api';
import Navbar from '../../components/Navbar';
import { FaDownload, FaMoneyBillWave } from 'react-icons/fa';
import './Maintenance.css';

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
      toast.error('Failed to fetch maintenance records');
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
        toast.error('Failed to load payment gateway');
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
              razorpay_signature: response.razorpay_signature
            });

            toast.success('Payment successful!');
            fetchRecords();
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: record.resident?.name,
          email: record.resident?.email,
          contact: record.resident?.phone
        },
        theme: {
          color: '#4f46e5'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('Failed to initiate payment');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      paid: 'badge-success',
      overdue: 'badge-danger'
    };
    return `badge ${badges[status]}`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading"><div className="spinner"></div></div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>Maintenance Payments</h1>
        </div>

        {records.length === 0 ? (
          <div className="empty-state">
            <p>No maintenance records found</p>
          </div>
        ) : (
          <div className="maintenance-grid">
            {records.map((record) => (
              <div key={record._id} className="maintenance-card">
                <div className="maintenance-header">
                  <h3>
                    {new Date(0, record.period.month - 1).toLocaleString('default', { month: 'long' })} {record.period.year}
                  </h3>
                  <span className={getStatusBadge(record.status)}>
                    {record.status}
                  </span>
                </div>

                <div className="maintenance-amount">
                  <span className="amount-label">Amount</span>
                  <span className="amount-value">₹{record.amount}</span>
                </div>

                <div className="maintenance-details">
                  <p>
                    <strong>Due Date:</strong> {new Date(record.dueDate).toLocaleDateString('en-GB')}
                  </p>
                  {record.paymentDate && (
                    <p>
                      <strong>Paid On:</strong> {new Date(record.paymentDate).toLocaleDateString('en-GB')}
                    </p>
                  )}
                  {record.transactionId && (
                    <p className="transaction-id">
                      <strong>Transaction ID:</strong> {record.transactionId}
                    </p>
                  )}
                </div>

                <div className="maintenance-actions">
                  {record.status === 'pending' || record.status === 'overdue' ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePayment(record)}
                    >
                      <FaMoneyBillWave /> Pay Now
                    </button>
                  ) : (
                    <button className="btn btn-outline" disabled>
                      <FaDownload /> Download Receipt
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Maintenance;
