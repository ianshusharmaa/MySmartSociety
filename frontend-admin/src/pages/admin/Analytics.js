import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download as DownloadIcon } from '@mui/icons-material';
import {
  getComplaintStats,
  getMaintenanceStats,
  getPermissionStats,
  getEvents,
} from '../../services/api';
import { toast } from 'react-toastify';
import './Analytics.css';

const AdminAnalytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('month');
  const [complaintsData, setComplaintsData] = useState(null);
  const [maintenanceData, setMaintenanceData] = useState(null);
  const [permissionsData, setPermissionsData] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const [complaints, maintenance, permissions, events] = await Promise.all([
        getComplaintStats(),
        getMaintenanceStats(),
        getPermissionStats(),
        getEvents(),
      ]);

      setComplaintsData(complaints.data);
      setMaintenanceData(maintenance.data);
      setPermissionsData(permissions.data);
      setEventsData(events.data || []);
    } catch (error) {
      toast.error('Failed to fetch analytics');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      timeRange,
      complaints: complaintsData,
      maintenance: maintenanceData,
      permissions: permissionsData,
      events: eventsData,
    };

    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2))
    );
    element.setAttribute('download', `report-${new Date().getTime()}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Report exported successfully');
  };

  // Chart Data
  const complaintTrendData = [
    { month: 'Jan', complaints: 24, resolved: 18 },
    { month: 'Feb', complaints: 32, resolved: 24 },
    { month: 'Mar', complaints: 28, resolved: 22 },
    { month: 'Apr', complaints: 35, resolved: 28 },
    { month: 'May', complaints: 41, resolved: 35 },
    { month: 'Jun', complaints: 38, resolved: 33 },
  ];

  const complaintCategoryData = complaintsData ? [
    { name: 'Plumbing', value: complaintsData.plumbing || 0 },
    { name: 'Electrical', value: complaintsData.electrical || 0 },
    { name: 'Maintenance', value: complaintsData.maintenance || 0 },
    { name: 'Security', value: complaintsData.security || 0 },
  ] : [];

  const maintenanceMonthData = [
    { month: 'Jan', collected: 85000, pending: 15000 },
    { month: 'Feb', collected: 92000, pending: 8000 },
    { month: 'Mar', collected: 88000, pending: 12000 },
    { month: 'Apr', collected: 95000, pending: 5000 },
    { month: 'May', collected: 98000, pending: 2000 },
    { month: 'Jun', collected: 100000, pending: 0 },
  ];

  const permissionStatusData = permissionsData ? [
    { name: 'Pending', value: permissionsData.pending || 0, fill: '#f59e0b' },
    { name: 'Approved', value: permissionsData.approved || 0, fill: '#10b981' },
    { name: 'Rejected', value: permissionsData.rejected || 0, fill: '#ef4444' },
  ] : [];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <p>Loading analytics...</p>
      </Box>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <div>
          <h1 className="analytics-title">Analytics & Reports</h1>
          <p className="analytics-subtitle">Comprehensive data analysis and insights</p>
        </div>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleExportReport}
          className="btn-export-report"
        >
          Export Report
        </Button>
      </div>

      <Card className="controls-card">
        <CardContent className="controls-content">
          <FormControl variant="outlined" size="small">
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              label="Time Range"
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        className="analytics-tabs"
      >
        <Tab label="Complaints Analysis" />
        <Tab label="Maintenance & Payments" />
        <Tab label="Permissions Overview" />
        <Tab label="Events Performance" />
      </Tabs>

      {/* Complaints Tab */}
      {tabValue === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Card className="chart-card">
              <CardContent>
                <h3 className="chart-title">Complaint Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={complaintTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="complaints" stroke="#ef4444" />
                    <Line type="monotone" dataKey="resolved" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card className="stats-card">
              <CardContent>
                <h3 className="chart-title">Complaint Summary</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <div className="stat-box">
                      <p className="stat-label">Total Complaints</p>
                      <p className="stat-value">{complaintsData?.total || 0}</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <div className="stat-box">
                      <p className="stat-label">Pending</p>
                      <p className="stat-value" style={{ color: '#f59e0b' }}>
                        {complaintsData?.pending || 0}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <div className="stat-box">
                      <p className="stat-label">In Progress</p>
                      <p className="stat-value" style={{ color: '#3b82f6' }}>
                        {complaintsData?.inProgress || 0}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <div className="stat-box">
                      <p className="stat-label">Resolved</p>
                      <p className="stat-value" style={{ color: '#10b981' }}>
                        {complaintsData?.resolved || 0}
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Maintenance Tab */}
      {tabValue === 1 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card className="chart-card">
              <CardContent>
                <h3 className="chart-title">Collections vs Pending</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={maintenanceMonthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="collected" fill="#10b981" />
                    <Bar dataKey="pending" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card className="stats-card">
              <CardContent>
                <h3 className="chart-title">Maintenance Summary</h3>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <div className="stat-box">
                      <p className="stat-label">Total Collected</p>
                      <p className="stat-value">
                        ₹{maintenanceData?.collectedAmount?.toLocaleString() || 0}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <div className="stat-box">
                      <p className="stat-label">Paid Residents</p>
                      <p className="stat-value" style={{ color: '#10b981' }}>
                        {maintenanceData?.paid || 0}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <div className="stat-box">
                      <p className="stat-label">Pending Residents</p>
                      <p className="stat-value" style={{ color: '#f59e0b' }}>
                        {maintenanceData?.pending || 0}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <div className="stat-box">
                      <p className="stat-label">Collection Rate</p>
                      <p className="stat-value" style={{ color: '#3b82f6' }}>
                        {maintenanceData?.collectionRate || 0}%
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Permissions Tab */}
      {tabValue === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Card className="chart-card">
              <CardContent>
                <h3 className="chart-title">Permission Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={permissionStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {permissionStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card className="stats-card">
              <CardContent>
                <h3 className="chart-title">Permissions Summary</h3>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <div className="stat-box">
                      <p className="stat-label">Total Permissions</p>
                      <p className="stat-value">{permissionsData?.total || 0}</p>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="stat-box">
                      <p className="stat-label">Pending</p>
                      <p className="stat-value" style={{ color: '#f59e0b' }}>
                        {permissionsData?.pending || 0}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="stat-box">
                      <p className="stat-label">Approved</p>
                      <p className="stat-value" style={{ color: '#10b981' }}>
                        {permissionsData?.approved || 0}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="stat-box">
                      <p className="stat-label">Rejected</p>
                      <p className="stat-value" style={{ color: '#ef4444' }}>
                        {permissionsData?.rejected || 0}
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Events Tab */}
      {tabValue === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card className="stats-card">
              <CardContent>
                <h3 className="chart-title">Events Performance</h3>
                <Grid container spacing={2}>
                  {eventsData.slice(0, 4).map((event, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                      <div className="event-stat-box">
                        <h4 className="event-title">{event.title?.substring(0, 25)}</h4>
                        <p className="event-stat">
                          <span className="event-label">Target:</span>
                          <span className="event-value">₹{event.targetAmount?.toLocaleString()}</span>
                        </p>
                        <p className="event-stat">
                          <span className="event-label">Collected:</span>
                          <span className="event-value" style={{ color: '#10b981' }}>
                            ₹{event.collectedAmount?.toLocaleString()}
                          </span>
                        </p>
                        <p className="event-stat">
                          <span className="event-label">Progress:</span>
                          <span className="event-value">
                            {Math.round(((event.collectedAmount || 0) / (event.targetAmount || 1)) * 100)}%
                          </span>
                        </p>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AdminAnalytics;
