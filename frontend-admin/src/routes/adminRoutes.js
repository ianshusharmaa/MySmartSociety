import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import KeyIcon from '@mui/icons-material/VpnKey';
import PaymentsIcon from '@mui/icons-material/Payments';
import EventIcon from '@mui/icons-material/Event';
import CampaignIcon from '@mui/icons-material/Campaign';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const adminRoutes = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
  { label: 'Complaints', path: '/admin/complaints', icon: <ReportProblemIcon /> },
  { label: 'Permissions', path: '/admin/permissions', icon: <KeyIcon /> },
  { label: 'Maintenance', path: '/admin/maintenance', icon: <PaymentsIcon /> },
  { label: 'Events', path: '/admin/events', icon: <EventIcon /> },
  { label: 'Notices', path: '/admin/notices', icon: <CampaignIcon /> },
  { label: 'Users', path: '/admin/users', icon: <GroupIcon /> },
  { label: 'Analytics', path: '/admin/analytics', icon: <AnalyticsIcon /> },
  { label: 'Settings', path: '/admin/settings', icon: <SettingsIcon /> },
];

export default adminRoutes;
