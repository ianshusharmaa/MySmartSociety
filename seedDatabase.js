const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const User = require('./backend/models/User');
const Complaint = require('./backend/models/Complaint');
const Permission = require('./backend/models/Permission');
const Maintenance = require('./backend/models/Maintenance');
const Event = require('./backend/models/Event');
const Notice = require('./backend/models/Notice');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Complaint.deleteMany({});
    await Permission.deleteMany({});
    await Maintenance.deleteMany({});
    await Event.deleteMany({});
    await Notice.deleteMany({});

    // Create Admin User
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      name: 'Ashwath Aynipully',
      email: 'admin@society.com',
      password: 'admin123',
      phone: '9876543210',
      role: 'admin'
    });

    // Create Resident Users
    console.log('👥 Creating resident users...');
    const resident1 = await User.create({
      name: 'Atharva Gandhe',
      email: 'resident@society.com',
      password: 'resident123',
      phone: '9876543211',
      flatNumber: 'A-101',
      building: 'Building A',
      role: 'resident'
    });

    const resident2 = await User.create({
      name: 'Aryan Borkar',
      email: 'jane@society.com',
      password: 'resident123',
      phone: '9876543212',
      flatNumber: 'B-205',
      building: 'Building B',
      role: 'resident'
    });

    // Create Staff User
    console.log('🛠️  Creating staff user...');
    const staff = await User.create({
      name: 'Anurag Khare',
      email: 'staff@society.com',
      password: 'staff123',
      phone: '9876543213',
      role: 'staff'
    });

    // Create Sample Complaints
    console.log('📝 Creating sample complaints...');
    await Complaint.create([
      {
        title: 'Water Supply Issue',
        category: 'water',
        description: 'No water supply since morning in my flat',
        priority: 'high',
        status: 'pending',
        resident: resident1._id
      },
      {
        title: 'Lift Not Working',
        category: 'lift',
        description: 'The lift in Building A is not functioning properly',
        priority: 'medium',
        status: 'in-progress',
        resident: resident1._id,
        assignedTo: staff._id,
        remarks: 'Technician has been called'
      },
      {
        title: 'Parking Space Occupied',
        category: 'parking',
        description: 'Someone has parked in my designated parking spot',
        priority: 'low',
        status: 'resolved',
        resident: resident2._id,
        remarks: 'Issue resolved, owner contacted'
      }
    ]);

    // Create Sample Permissions
    console.log('🔑 Creating sample permission requests...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    await Permission.create([
      {
        type: 'party',
        title: 'Birthday Party',
        description: 'Planning a birthday party for my daughter',
        startDate: tomorrow,
        endDate: tomorrow,
        status: 'pending',
        resident: resident1._id
      },
      {
        type: 'renovation',
        title: 'Kitchen Renovation',
        description: 'Need to renovate kitchen, work will involve drilling',
        startDate: tomorrow,
        endDate: nextWeek,
        status: 'approved',
        resident: resident2._id,
        approvedBy: admin._id,
        remarks: 'Approved, please ensure work is done between 10 AM - 6 PM'
      }
    ]);

    // Create Sample Maintenance Records
    console.log('💰 Creating maintenance records...');
    const currentDate = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    await Maintenance.create([
      {
        resident: resident1._id,
        amount: 5000,
        period: { month: currentDate.getMonth() + 1, year: currentDate.getFullYear() },
        dueDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
        status: 'pending'
      },
      {
        resident: resident2._id,
        amount: 5000,
        period: { month: currentDate.getMonth() + 1, year: currentDate.getFullYear() },
        dueDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
        status: 'paid',
        paymentDate: new Date(),
        transactionId: 'pay_demo123456',
        razorpayPaymentId: 'pay_demo123456'
      },
      {
        resident: resident1._id,
        amount: 5000,
        period: { month: nextMonth.getMonth() + 1, year: nextMonth.getFullYear() },
        dueDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 10),
        status: 'pending'
      }
    ]);

    // Create Sample Events
    console.log('🎉 Creating sample events...');
    const eventStart = new Date();
    eventStart.setDate(eventStart.getDate() + 15);
    const eventEnd = new Date();
    eventEnd.setDate(eventEnd.getDate() + 16);

    await Event.create([
      {
        title: 'Ganesh Chaturthi Celebration',
        description: 'Annual Ganesh Chaturthi celebration in the society',
        category: 'ganpati',
        targetAmount: 50000,
        collectedAmount: 25000,
        startDate: eventStart,
        endDate: eventEnd,
        status: 'active',
        createdBy: admin._id
      },
      {
        title: 'Society Annual Function',
        description: 'Annual function with cultural programs and dinner',
        category: 'annual-function',
        targetAmount: 100000,
        collectedAmount: 45000,
        startDate: new Date(currentDate.getFullYear(), 11, 25),
        endDate: new Date(currentDate.getFullYear(), 11, 26),
        status: 'active',
        createdBy: admin._id
      }
    ]);

    // Create Sample Notices
    console.log('📢 Creating sample notices...');
    await Notice.create([
      {
        title: 'Water Supply Maintenance',
        content: 'Water supply will be suspended tomorrow from 10 AM to 2 PM for tank cleaning. Please store water in advance.',
        category: 'maintenance',
        priority: 'high',
        createdBy: admin._id
      },
      {
        title: 'Society Meeting',
        content: 'Monthly society meeting will be held on 25th of this month at 7 PM in the clubhouse. All members are requested to attend.',
        category: 'meeting',
        priority: 'medium',
        createdBy: admin._id,
        expiryDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25)
      },
      {
        title: 'Parking Rules Update',
        content: 'New parking rules have been implemented. Visitor parking is now limited to 2 hours. Please inform your guests.',
        category: 'rule-change',
        priority: 'medium',
        createdBy: admin._id
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:');
    console.log('  Email: admin@society.com');
    console.log('  Password: admin123');
    console.log('\nResident:');
    console.log('  Email: resident@society.com');
    console.log('  Password: resident123');
    console.log('\nStaff:');
    console.log('  Email: staff@society.com');
    console.log('  Password: staff123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
