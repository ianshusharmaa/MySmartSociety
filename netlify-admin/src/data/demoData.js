// Demo Data for Admin Panel - Hardcoded Examples

export const DEMO_COMPLAINTS = [
  {
    _id: '1',
    title: 'Water Leakage in Flat 101',
    description: 'Water is leaking from the ceiling in the living room. Needs immediate attention.',
    category: 'Maintenance',
    priority: 'high',
    status: 'Open',
    resident: { name: 'John Doe', flatNumber: '101', building: 'Tower A' },
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  },
  {
    _id: '2',
    title: 'Lift Not Working',
    description: 'Lift in Tower B is not working since yesterday. Residents facing difficulty.',
    category: 'Infrastructure',
    priority: 'high',
    status: 'In Progress',
    resident: { name: 'Sarah Smith', flatNumber: '205', building: 'Tower B' },
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
    resident: { name: 'Michael Johnson', flatNumber: '305', building: 'Tower C' },
    createdAt: '2024-01-20',
    updatedAt: '2024-01-23'
  },
  {
    _id: '4',
    title: 'Garbage Disposal Issue',
    description: 'Garbage disposal point is overflowing. Need better management.',
    category: 'Sanitation',
    priority: 'medium',
    status: 'Open',
    resident: { name: 'Emma Wilson', flatNumber: '401', building: 'Tower A' },
    createdAt: '2024-01-26',
    updatedAt: '2024-01-26'
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
  },
  {
    _id: '4',
    title: 'Kids Art & Craft Workshop',
    description: 'Creative workshop for kids to explore their artistic talents.',
    date: '2024-02-10',
    time: '4:00 PM',
    location: 'Kids Room',
    organizer: 'Cultural Committee',
    attendees: 35,
    image: '🎨',
    createdAt: '2024-01-25'
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
  },
  {
    _id: '4',
    title: 'Building Insurance Renewal',
    content: 'Building insurance renewal has been completed. All residents are insured under the new policy.',
    type: 'Announcement',
    priority: 'low',
    issueDate: '2024-01-24',
    expiryDate: '2024-02-24',
    author: 'Finance Team',
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
    cost: 5000,
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
    cost: 8000,
    vendor: 'SafeLift Services',
    priority: 'high',
    createdAt: '2024-01-15'
  },
  {
    _id: '3',
    title: 'Exterior Painting',
    description: 'Painting and repainting of exterior walls.',
    category: 'Painting',
    status: 'Pending',
    scheduledDate: '2024-02-10',
    cost: 45000,
    vendor: 'Color Pro Painters',
    priority: 'medium',
    createdAt: '2024-01-10'
  },
  {
    _id: '4',
    title: 'Electrical System Check',
    description: 'Annual electrical system inspection and safety check.',
    category: 'Electrical',
    status: 'Completed',
    scheduledDate: '2024-01-22',
    cost: 6000,
    vendor: 'ElectroTech Solutions',
    priority: 'high',
    createdAt: '2024-01-05'
  }
];

export const DEMO_RESIDENTS = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '9876543210',
    building: 'Tower A',
    flatNumber: '101',
    ownershipStatus: 'Owner',
    memberSince: '2022-05-15'
  },
  {
    _id: '2',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    phone: '9876543211',
    building: 'Tower B',
    flatNumber: '205',
    ownershipStatus: 'Tenant',
    memberSince: '2023-01-10'
  },
  {
    _id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '9876543212',
    building: 'Tower C',
    flatNumber: '305',
    ownershipStatus: 'Owner',
    memberSince: '2021-08-20'
  },
  {
    _id: '4',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    phone: '9876543213',
    building: 'Tower A',
    flatNumber: '401',
    ownershipStatus: 'Owner',
    memberSince: '2022-03-12'
  }
];

export const DEMO_PERMISSIONS = [
  {
    _id: '1',
    title: 'Guest Permission',
    requestedBy: { name: 'John Doe', flatNumber: '101' },
    guestDetails: 'Friend visiting from Delhi',
    checkInDate: '2024-02-01',
    checkOutDate: '2024-02-05',
    status: 'Approved',
    approvedBy: 'Admin',
    createdAt: '2024-01-26'
  },
  {
    _id: '2',
    title: 'Servant Permission',
    requestedBy: { name: 'Sarah Smith', flatNumber: '205' },
    guestDetails: 'House help - Daily worker',
    checkInDate: '2024-01-28',
    checkOutDate: '2024-12-31',
    status: 'Pending',
    approvedBy: null,
    createdAt: '2024-01-25'
  },
  {
    _id: '3',
    title: 'Guest Permission',
    requestedBy: { name: 'Michael Johnson', flatNumber: '305' },
    guestDetails: 'Family members visiting',
    checkInDate: '2024-01-30',
    checkOutDate: '2024-02-02',
    status: 'Approved',
    approvedBy: 'Admin',
    createdAt: '2024-01-24'
  }
];
