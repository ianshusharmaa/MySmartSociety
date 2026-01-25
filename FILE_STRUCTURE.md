# File Structure

## Root Folders

backend/ - Server and API code
frontend-admin/ - Admin dashboard frontend
frontend-user/ - Resident portal frontend

## Backend

server.js - Main server file
config/db.js - Database connection
controllers/ - Business logic for each feature
models/ - Data models (User, Complaint, Permission, etc)
routes/ - API endpoints
middleware/ - Authentication and error handling

## Frontend

Both frontends have same structure:

public/index.html - Main HTML file
src/App.js - Main app component
src/index.js - App entry point
src/components/ - Reusable components (Navbar, PrivateRoute, etc)
src/context/ - State management (AuthContext)
src/pages/ - Page components (Login, Dashboard, etc)
src/services/api.js - API calls
src/layout/ - Layout components (AdminLayout, ResidentLayout)

### Pages

Admin pages: Complaints, Permissions, Maintenance, Events, Notices, Users, Dashboard
Resident pages: Dashboard, Complaints, Permissions, Maintenance, Events, Notices

## Key Files

package.json - Dependencies
.env - Environment variables
seedDatabase.js - Sample data for testing
README.md - Project info
SETUP_GUIDE.md - How to install
FEATURES.md - Feature list
