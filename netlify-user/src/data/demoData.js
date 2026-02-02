// Demo Data for Resident Panel - Hardcoded Examples

export const DEMO_COMPLAINTS = [
  {
    _id: '1',
    title: 'Water Leakage in Flat 205',
    description: 'Water is leaking from the ceiling in the living room. Needs immediate attention.',
    category: 'Maintenance',
    priority: 'high',
    status: 'Open',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  },
  {
    _id: '2',
    title: 'Lift Not Working',
    description: 'Lift in Tower B is not working since yesterday.',
    category: 'Infrastructure',
    priority: 'high',
    status: 'In Progress',
    createdAt: '2024-01-24',
    updatedAt: '2024-01-25'
  },
  {
    _id: '3',
    title: 'Damaged Common Area Light',
    description: 'Light in parking area is broken and needs replacement.',
    category: 'Maintenance',
    priority: 'medium',
    status: 'Resolved',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-23'
  }
];

export const DEMO_EVENTS = [
  {
    _id: '1',
    title: 'Annual Society Meetup',
    description: 'Join us for the annual meetup to discuss society matters and community plans.',
    date: '2024-02-15',
    time: '6:00 PM',
    location: 'Community Hall',
    organizer: 'Admin Team',
    attendees: 45,
    image: '🎉',
    createdAt: '2024-01-20'
  },
  {
    _id: '2',
    title: 'Sports Day',
    description: 'A fun-filled day of sports activities for residents of all ages.',
    date: '2024-02-20',
    time: '8:00 AM',
    location: 'Society Grounds',
    organizer: 'Sports Committee',
    attendees: 62,
    image: '⚽',
    createdAt: '2024-01-22'
  },
  {
    _id: '3',
    title: 'Yoga & Wellness Session',
    description: 'Free yoga session for residents to improve health and wellness.',
    date: '2024-01-30',
    time: '7:00 AM',
    location: 'Yoga Studio',
    organizer: 'Wellness Club',
    attendees: 28,
    image: '🧘',
    createdAt: '2024-01-24'
  }
];

export const DEMO_NOTICES = [
  {
    _id: '1',
    title: 'Maintenance Work Schedule',
    content: 'Scheduled maintenance work will be done from Jan 28 to Feb 2. Please avoid parking in designated areas.',
    type: 'Important',
    priority: 'high',
    issueDate: '2024-01-26',
    expiryDate: '2024-02-02',
    author: 'Property Manager',
    status: 'Active'
  },
  {
    _id: '2',
    title: 'Water Supply Maintenance',
    content: 'Water supply will be interrupted from 6 AM to 8 AM on Jan 29 for pipeline maintenance.',
    type: 'Maintenance',
    priority: 'high',
    issueDate: '2024-01-26',
    expiryDate: '2024-01-29',
    author: 'Maintenance Team',
    status: 'Active'
  },
  {
    _id: '3',
    title: 'New Parking Regulations',
    content: 'New parking rules have been implemented. Please refer to the notice board for detailed information.',
    type: 'Announcement',
    priority: 'medium',
    issueDate: '2024-01-25',
    expiryDate: '2024-03-25',
    author: 'Administration',
    status: 'Active'
  }
];

export const DEMO_MAINTENANCE = [
  {
    _id: '1',
    title: 'Monthly Plumbing Check',
    description: 'Routine plumbing inspection and maintenance for all water lines.',
    category: 'Plumbing',
    status: 'Scheduled',
    scheduledDate: '2024-02-05',
    vendor: 'Expert Plumbers Ltd.',
    priority: 'medium',
    createdAt: '2024-01-20'
  },
  {
    _id: '2',
    title: 'Lift Servicing',
    description: 'Regular maintenance and servicing of lifts in Tower A and B.',
    category: 'Lifts',
    status: 'In Progress',
    scheduledDate: '2024-01-28',
    vendor: 'SafeLift Services',
    priority: 'high',
    createdAt: '2024-01-15'
  }
];
