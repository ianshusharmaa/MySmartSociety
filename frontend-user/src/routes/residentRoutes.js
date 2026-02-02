import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import KeyIcon from '@mui/icons-material/VpnKey';
import PaymentsIcon from '@mui/icons-material/Payments';
import EventIcon from '@mui/icons-material/Event';
import CampaignIcon from '@mui/icons-material/Campaign';

const residentRoutes = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Complaints', path: '/complaints', icon: <ReportProblemIcon /> },
  { label: 'Permissions', path: '/permissions', icon: <KeyIcon /> },
  { label: 'Maintenance', path: '/maintenance', icon: <PaymentsIcon /> },
  { label: 'Events', path: '/events', icon: <EventIcon /> },
  { label: 'Notices', path: '/notices', icon: <CampaignIcon /> },
];

export default residentRoutes;
