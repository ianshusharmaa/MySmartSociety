# Setup Guide

## What You Need

- Node.js v14+
- MongoDB v4.4+
- npm or yarn
- Razorpay account

## Check Installation

node --version
npm --version
mongod --version

## Installation

1. Clone the project

   git clone <repo>
   cd MySmartSociety

2. Install dependencies

   npm install
   cd frontend-admin && npm install && cd ..
   cd frontend-user && npm install && cd ..

3. Create .env file

   Create .env in root directory:
   
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart-society
   JWT_SECRET=your_secret_key
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   FRONTEND_URL=http://localhost:3000

4. Start MongoDB

   mongod

5. Seed database (optional)

   node seedDatabase.js

6. Start backend

   npm run dev

7. Start frontends (in new terminals)

   Frontend Admin:
   cd frontend-admin && npm start

   Frontend User:
   cd frontend-user && npm start

## Access

- Frontend Admin: http://localhost:3001
- Frontend User: http://localhost:3000
- Backend: http://localhost:5000

## Demo Users

Admin: admin@society.com / admin123
Resident: resident@society.com / resident123


## Default Login Credentials

After seeding the database, use these credentials to login:

**Admin Login:**
- Email: admin@society.com
- Password: admin123

**Resident Login:**
- Email: resident@society.com
- Password: resident123

**Staff Login:**
- Email: staff@society.com
- Password: staff123

**Important:** Please change the default passwords after your first login for security purposes.

## Testing the Application

1. Open your browser and go to http://localhost:3000
2. Click on Login
3. Use the admin or resident credentials provided above
4. Explore the different features based on your role

## Common Issues and Solutions

### MongoDB Connection Error
- Make sure MongoDB service is running
- Check if the MONGODB_URI in .env file is correct
- Verify MongoDB is installed properly

### Port Already in Use
- If port 5000 or 3000 is already in use, change the port in .env file
- Kill the process using the port or use a different port number

### npm Install Errors
- Delete node_modules folder and package-lock.json
- Run npm install again
- Make sure you have the latest version of Node.js

### Razorpay Payment Errors
- Verify your Razorpay API keys are correct in .env file
- Make sure you are using test mode keys for development
- Check if Razorpay dashboard shows the test payments

## Next Steps

Once the application is running successfully:
1. Explore the admin dashboard
2. Create some test complaints as a resident
3. Try creating maintenance records
4. Test the payment integration with Razorpay test mode
5. Create events and notices
6. Experiment with different user roles

## Development Mode

The application runs in development mode by default. In this mode:
- Hot reloading is enabled for frontend
- Backend restarts automatically on file changes (if using nodemon)
- Detailed error messages are shown
- Console logs are visible

## Production Deployment

For production deployment, refer to the DEPLOYMENT.md file for detailed instructions on deploying to various platforms like Heroku, Vercel, or VPS.

## Support

If you encounter any issues during setup, please check:
- All environment variables are set correctly
- MongoDB is running
- All dependencies are installed
- Port numbers are not conflicting with other applications

## Additional Configuration

### Email Notifications (Future Feature)
To enable email notifications, add these to your .env file:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### File Uploads (Future Feature)
To enable file uploads for complaints, configure:
```env
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

## Useful Commands

```bash
# Start backend only
npm run server

# Start frontend only
cd frontend && npm start

# Run tests (if available)
npm test

# Build frontend for production
cd frontend && npm run build

# Seed database with sample data
node seedDatabase.js

# Clear database (use with caution)
node clearDatabase.js
```

## Project Structure Overview

```
MySmartSociety/
├── backend/          # Backend Node.js application
├── frontend/         # React frontend application
├── .env             # Environment variables (create this)
├── package.json     # Backend dependencies
└── seedDatabase.js  # Database seeder
```

For detailed file structure, see FILE_STRUCTURE.md

## Development Tips

- Use Chrome DevTools for debugging frontend
- Use Postman or Thunder Client to test API endpoints
- Check browser console for frontend errors
- Check terminal console for backend errors
- Use MongoDB Compass to view database contents
