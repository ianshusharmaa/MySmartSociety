# Admin Panel - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation & Setup

```bash
# Navigate to admin frontend directory
cd frontend-admin

# Install dependencies
npm install

# Start development server
npm start
```

The admin panel will open at `http://localhost:3001`

---

## 📌 Login Credentials

To access the admin panel:
1. Go to `http://localhost:3001/login`
2. Use your admin credentials
3. Dashboard appears after successful login

---

## 🎯 Main Sections Overview

### 1️⃣ Dashboard (`/admin/dashboard`)
**What to do:**
- View all key metrics at a glance
- Check complaint status distribution
- Monitor payment collections
- See user activity statistics
- Quick navigate to any module

**Key Information:**
- Total complaints with pending count
- Permission requests pending
- Maintenance collection amount
- Residents awaiting payment

---

### 2️⃣ Users (`/admin/users`)
**What to do:**
- Add new residents or admins
- Edit user details
- Deactivate inactive users
- Search users by name/email/flat
- Filter by role or status

**Common Tasks:**
```
✓ Create new resident account
✓ Promote resident to admin
✓ Suspend problematic user
✓ Update contact information
✓ Bulk filter active residents
```

---

### 3️⃣ Complaints (`/admin/complaints`)
**What to do:**
- View all resident complaints
- Update complaint status
- Assign to technicians
- Add progress remarks
- Track resolution time

**Status Management:**
- **Pending** → New complaint received
- **In Progress** → Work started
- **Resolved** → Issue fixed and closed

**Priority Levels:**
- 🔴 High - Urgent (electricity, water issues)
- 🟡 Medium - Standard (maintenance, repairs)
- 🟢 Low - Non-urgent (cosmetic, requests)

**Categories:**
- Plumbing 🔧
- Electrical ⚡
- Maintenance 🛠️
- Security 🔒
- Cleanliness 🧹

---

### 4️⃣ Permissions (`/admin/permissions`)
**What to do:**
- Review permission requests
- Approve/reject resident requests
- Track common request types
- Add remarks and timeline

**Common Requests:**
- Pet keeping permission
- Flat modification
- Guest staying permission
- Parking allocation
- Lease transfer

---

### 5️⃣ Maintenance (`/admin/maintenance`)
**What to do:**
- Track payment collections
- Monitor pending payments
- Send payment reminders
- View payment history
- Generate financial reports

**Key Metrics:**
- Monthly collection amount
- Residents who paid
- Payment due status
- Overdue payment alerts

---

### 6️⃣ Events (`/admin/events`)
**What to do:**
- Create new fundraising events
- Track collection progress
- Monitor event attendance
- View participant list
- Manage event timeline

**Event Types:**
- Building repairs/renovation
- Community parties
- Emergency fund
- Special maintenance
- Charity events

---

### 7️⃣ Notices (`/admin/notices`)
**What to do:**
- Create important announcements
- Broadcast notices to residents
- Schedule future notices
- Track notice delivery status
- Archive old notices

**Notice Types:**
- Maintenance schedules
- Water/electricity cuts
- Payment reminders
- Society meetings
- Emergency alerts
- General announcements

---

### 8️⃣ Analytics (`/admin/analytics`)
**What to do:**
- View detailed statistics
- Track trends over time
- Generate reports
- Export data for analysis
- Monitor performance metrics

**Available Reports:**
1. **Complaints Analysis**
   - Trend line chart
   - Category distribution
   - Resolution statistics

2. **Maintenance & Payments**
   - Collection progress
   - Payment status
   - Collection rate

3. **Permissions Overview**
   - Request distribution
   - Approval rates
   - Pending requests

4. **Events Performance**
   - Fundraiser progress
   - Collection targets
   - Event participation

---

### 9️⃣ Settings (`/admin/settings`)
**What to do:**
- Configure general settings
- Manage admin profile
- Update society information
- Set system preferences
- Configure notifications

---

## 💡 Pro Tips

### Search & Filter
- Use search bar for quick lookups
- Stack multiple filters for precision
- Pagination shows 10-25 items per page

### Data Management
- Always confirm before deleting
- Export reports for record keeping
- Use update functionality for partial changes

### Navigation
- Sidebar shows all available sections
- Click section name to go to main page
- Breadcrumbs show your current location
- Use browser back button to return

### Mobile Access
- Admin panel works on tablets
- Mobile version has simplified layout
- Some features optimized for desktop

---

## ⚠️ Important Notes

### Access Control
- Only admins can access admin panel
- Users cannot modify each other's data
- All actions are logged for audit

### Data Safety
- Confirmation required for deletions
- Undo not available - be careful!
- Regular backups recommended
- Export data regularly for safety

### Performance
- Large datasets load with pagination
- Filters help reduce data displayed
- Charts may take time to render
- Refresh page if data seems stale

---

## 🔧 Troubleshooting

### Problem: Dashboard shows no data
**Solution:**
1. Check if backend is running (`http://localhost:5000`)
2. Verify internet connection
3. Refresh the page
4. Clear browser cache
5. Check browser console for errors

### Problem: Can't add new user
**Solution:**
1. Verify all required fields are filled
2. Check password is at least 6 characters
3. Ensure email is valid format
4. Try again or refresh page

### Problem: Complaint update failed
**Solution:**
1. Verify you're still logged in
2. Check internet connection
3. Try smaller updates first
4. Check browser console for error details

### Problem: Charts not showing
**Solution:**
1. Refresh the analytics page
2. Try a different time range
3. Clear browser cache
4. Try in a different browser
5. Check if data exists for selected range

---

## 📞 Support

If you encounter issues:
1. **Check Console**: Press F12, go to Console tab
2. **Check Backend**: Verify backend is running
3. **Clear Cache**: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
4. **Restart Application**: Stop and restart `npm start`
5. **Contact Developer**: Reach out to Anshu Sharma

---

## 📚 Additional Resources

- **Full Documentation**: See `ADMIN_PANEL_IMPROVEMENTS.md`
- **API Documentation**: Check backend `README.md`
- **File Structure**: See `FILE_STRUCTURE.md`
- **Project Summary**: See `PROJECT_SUMMARY.md`

---

**Happy Managing! 🎉**

*MySmartSociety Admin Panel v1.0*
*Created: February 3, 2026*
