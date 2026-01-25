import React, { useState, useEffect } from 'react';
import { showToast } from '../../utils/notifications';
import { getEvents, createContributionOrder, contributeToEvent } from '../../services/api';
import { FaMoneyBillWave, FaCalendar } from 'react-icons/fa';
import './Events.css';

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
      const { data: orderData } = await createContributionOrder(event._id, { amount: parseInt(amount, 10) });

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
              razorpay_signature: response.razorpay_signature
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
          color: '#4f46e5'
        }
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
      <div className="loading"><div className="spinner"></div></div>
    );
  }

  return (
    <div className="page-container">
        <div className="page-header">
          <h1>Society Events & Fundraisers</h1>
        </div>

        {events.length === 0 ? (
          <div className="empty-state">
            <p>No events found</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <span className="badge badge-info">{event.category.replace('-', ' ')}</span>
                </div>

                <p className="event-description">{event.description}</p>

                <div className="event-dates">
                  <FaCalendar />
                  <span>
                      {new Date(event.startDate).toLocaleDateString('en-GB')} - {new Date(event.endDate).toLocaleDateString('en-GB')}
                  </span>
                </div>

                <div className="event-progress">
                  <div className="progress-info">
                    <span>₹{event.collectedAmount.toLocaleString()}</span>
                    <span>₹{event.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${getProgressPercentage(event)}%` }}
                    ></div>
                  </div>
                  <p className="progress-percentage">{getProgressPercentage(event).toFixed(1)}% collected</p>
                </div>

                {selectedEvent?._id === event._id ? (
                  <div className="contribute-form">
                    <input
                      type="number"
                      className="form-input"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="1"
                    />
                    <div className="contribute-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setSelectedEvent(null);
                          setAmount('');
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleContribute(event)}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <FaMoneyBillWave /> Contribute
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
  );
};

export default Events;
