# MySmartSociety

A housing society management platform for residents and admins.

## What It Does

For Residents:
- Report complaints and track status
- Request permissions for events and renovations
- Pay maintenance fees online
- Contribute to society fundraising
- View announcements
- Manage profile

For Admins:
- View and manage complaints
- Approve or reject permission requests
- Create maintenance records and track payments
- Organize events and track donations
- Send notices to residents
- Manage user accounts

## Tech Stack

- Frontend: React, CSS
- Backend: Node.js, Express
- Database: MongoDB
- Payments: Razorpay
- Authentication: JWT

## Getting Started

### Requirements

- Node.js v14+
- MongoDB
- npm or yarn
- Razorpay account

### Setup

1. Clone and install
   
   git clone <repo>
   cd MySmartSociety
   npm install

2. Setup environment variables

   Create .env file in root:
   
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart-society
   JWT_SECRET=your_secret_key
   RAZORPAY_KEY_ID=your_key
   RAZORPAY_KEY_SECRET=your_secret

3. Start MongoDB

   mongod

4. Run the app

   npm run dev

5. Open frontend in new terminal

   cd frontend
   npm start

## Default Login

Admin: admin@society.com / admin123
Resident: resident@society.com / resident123

## Project Structure

backend/ - Server code and API
frontend-admin/ - Admin dashboard
frontend-user/ - Resident portal

## Developed By

Anshukumar Sharma
anshukumar.sharma.btechcse@ghrua.edu.in


#### Option 2: Run Both Concurrently
```bash
npm run dev:all
```

### 7. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Default Admin Credentials

After first run, you can create an admin account or use:
- **Email**: admin@smartsociety.com
- **Password**: admin123

**Important**: Change the default admin password after first login!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint

### Permissions
- `GET /api/permissions` - Get all permission requests
- `POST /api/permissions` - Create permission request
- `PUT /api/permissions/:id` - Update permission status

### Maintenance
- `GET /api/maintenance` - Get maintenance records
- `POST /api/maintenance/pay` - Process payment
- `GET /api/maintenance/history` - Get payment history

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event (Admin)
- `POST /api/events/:id/contribute` - Contribute to event

### Notices
- `GET /api/notices` - Get all notices
- `POST /api/notices` - Create notice (Admin)

## Razorpay Integration

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API Key ID and Secret from the dashboard
3. Add them to your `.env` file
4. Enable required payment methods in Razorpay dashboard

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- CORS protection
- Secure payment processing

## Database Schema

The system uses MongoDB with the following collections:
- **Users** - User accounts (residents, admin, staff)
- **Complaints** - Complaint records
- **Permissions** - Permission requests
- **Maintenance** - Maintenance payment records
- **Events** - Society events
- **Contributions** - Event contributions
- **Notices** - Society announcements

## Project Objectives

- Reduce paperwork and manual processes
- Improve transparency in society operations
- Simplify maintenance payments
- Enable online permission requests
- Improve communication between residents and management
- Provide real-time tracking of complaints and requests
- Maintain digital records for auditing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email: anshukumar.sharma.btechcse@ghrua.edu.in

---

**Developed by Anshukumar Sharma**
