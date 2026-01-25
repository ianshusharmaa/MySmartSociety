import React, { useState, useEffect } from 'react';
import { getNotices } from '../../services/api';
import Navbar from '../../components/Navbar';
import { FaBullhorn, FaExclamationTriangle } from 'react-icons/fa';
import './Notices.css';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await getNotices();
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch notices');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: 'badge-info',
      medium: 'badge-warning',
      high: 'badge-danger'
    };
    return `badge ${badges[priority]}`;
  };

  const getCategoryIcon = (category) => {
    if (category === 'urgent') return <FaExclamationTriangle />;
    return <FaBullhorn />;
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
          <h1>Society Notices & Announcements</h1>
        </div>

        {notices.length === 0 ? (
          <div className="empty-state">
            <p>No notices found</p>
          </div>
        ) : (
          <div className="notices-list">
            {notices.map((notice) => (
              <div key={notice._id} className={`notice-card notice-${notice.priority}`}>
                <div className="notice-header">
                  <div className="notice-title-section">
                    <span className="notice-icon">{getCategoryIcon(notice.category)}</span>
                    <h3>{notice.title}</h3>
                  </div>
                  <div className="notice-badges">
                    <span className={getPriorityBadge(notice.priority)}>
                      {notice.priority}
                    </span>
                    <span className="badge badge-info">{notice.category}</span>
                  </div>
                </div>

                <p className="notice-content">{notice.content}</p>

                <div className="notice-footer">
                  <span className="notice-date">
                    Posted: {new Date(notice.createdAt).toLocaleDateString('en-GB')}
                  </span>
                  {notice.expiryDate && (
                    <span className="notice-expiry">
                      Expires: {new Date(notice.expiryDate).toLocaleDateString('en-GB')}
                    </span>
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

export default Notices;
