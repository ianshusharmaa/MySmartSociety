# Deployment Guide\n\n## Quick Deploy - Heroku + Netlify\n\nThis is the easiest way to deploy your app.\n\n### Deploy Backend to Heroku\n\n1. Create Heroku account at heroku.com\n2. Install Heroku CLI\n3. Run these commands:\n\n   heroku login\n   heroku create your-app-name-backend\n   heroku addons:create mongolab:sandbox\n   heroku config:set JWT_SECRET=your_secret\n   heroku config:set RAZORPAY_KEY_ID=your_key\n   heroku config:set RAZORPAY_KEY_SECRET=your_secret\n   git push heroku main\n\n4. Create Procfile in root:\n\n   web: node backend/server.js\n\n### Deploy Frontend to Netlify\n\n1. Build frontend:\n\n   cd frontend-admin\n   npm run build\n\n2. Go to netlify.com and drag-drop the build folder\n3. Set environment variable: REACT_APP_API_URL to your Heroku backend URL\n\n## Alternative: Deploy to AWS\n\n1. Use AWS Elastic Beanstalk for backend\n2. Use S3 + CloudFront for frontend\n3. Use RDS for MongoDB (or use MongoDB Atlas)\n\n## Using MongoDB Atlas (Recommended)\n\n1. Create account at mongodb.com/cloud/atlas\n2. Create cluster\n3. Get connection string\n4. Add to .env:\n\n   MONGODB_URI=your_atlas_connection_string\n\n## Check Deployment\n\nAfter deployment:\n- Test backend API: https://your-backend.herokuapp.com/api/complaints\n- Test frontend: https://your-frontend.netlify.app\n- Check logs: heroku logs --tail\n"

#### Prerequisites
- Ubuntu 20.04 or higher server
- Domain name (optional but recommended)
- SSH access to the server

#### Backend Setup on VPS

**Step 1: Install Node.js and MongoDB**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Step 2: Install Nginx (Web Server)**

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

**Step 3: Clone and Setup Application**

```bash
# Clone repository
cd /var/www
sudo git clone your-repository-url smart-society
cd smart-society

# Install dependencies
npm install
cd frontend
npm install
cd ..

# Build frontend
cd frontend
npm run build
cd ..
```

**Step 4: Setup Environment Variables**

```bash
sudo nano .env
```

Add your environment variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-society
JWT_SECRET=your_super_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
FRONTEND_URL=https://yourdomain.com
```

**Step 5: Install PM2 (Process Manager)**

```bash
sudo npm install -g pm2

# Start backend
pm2 start backend/server.js --name smart-society-backend

# Start PM2 on boot
pm2 startup
pm2 save
```

**Step 6: Configure Nginx**

```bash
sudo nano /etc/nginx/sites-available/smart-society
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /var/www/smart-society/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/smart-society /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Step 7: Setup SSL with Let's Encrypt (Optional but Recommended)**

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

### Option 4: Deploy to AWS (Amazon Web Services)

AWS offers multiple services for deployment:

#### Using AWS Elastic Beanstalk

**Step 1: Install EB CLI**
```bash
pip install awsebcli
```

**Step 2: Initialize EB Application**
```bash
eb init -p node.js smart-society-backend
```

**Step 3: Create Environment and Deploy**
```bash
eb create smart-society-env
eb deploy
```

#### Using AWS EC2

Follow similar steps as VPS deployment mentioned in Option 3.

### Option 5: Deploy Using Docker

Docker provides containerization for easy deployment.

#### Create Dockerfile for Backend

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "backend/server.js"]
```

#### Create Dockerfile for Frontend

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/smart-society
      - JWT_SECRET=your_secret
      - RAZORPAY_KEY_ID=your_key
      - RAZORPAY_KEY_SECRET=your_secret
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

#### Deploy with Docker

```bash
docker-compose up -d
```

## Post-Deployment Checklist

After deploying your application, verify the following:

### Backend Checklist
- Backend API is accessible
- Database connection is working
- Environment variables are set correctly
- API endpoints are responding
- Authentication is working
- Payment gateway is configured

### Frontend Checklist
- Frontend loads correctly
- API calls are working
- Login and registration work
- All pages are accessible
- Responsive design works on mobile
- Payment integration works

### Security Checklist
- HTTPS is enabled (SSL certificate)
- Environment variables are secure
- CORS is properly configured
- Default passwords are changed
- Database is secured
- API rate limiting (optional)

## Monitoring and Maintenance

### Using PM2 for Monitoring

```bash
# View running processes
pm2 list

# View logs
pm2 logs smart-society-backend

# Monitor resources
pm2 monit

# Restart application
pm2 restart smart-society-backend
```

### Database Backup

```bash
# Backup MongoDB
mongodump --db smart-society --out /backup/$(date +%Y%m%d)

# Restore MongoDB
mongorestore --db smart-society /backup/20231201/smart-society
```

## Troubleshooting Common Issues

### Application Not Starting
- Check PM2 logs: pm2 logs
- Verify environment variables
- Check MongoDB connection
- Verify port availability

### 502 Bad Gateway (Nginx)
- Check if backend is running: pm2 list
- Verify Nginx configuration: sudo nginx -t
- Check backend logs

### Database Connection Error
- Verify MongoDB is running: sudo systemctl status mongod
- Check MongoDB URI in .env
- Verify database permissions

### Payment Integration Not Working
- Verify Razorpay keys are correct
- Check if keys are for test or live mode
- Review Razorpay dashboard for errors

## Updating the Application

### Update Backend
```bash
cd /var/www/smart-society
git pull origin main
npm install
pm2 restart smart-society-backend
```

### Update Frontend
```bash
cd /var/www/smart-society/frontend
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
```

## Performance Optimization

### Enable Gzip Compression in Nginx

```nginx
gzip on;
gzip_vary on;
gzip_min_length 10240;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### Enable Caching

```nginx
location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Database Indexing

Ensure proper indexes in MongoDB for better performance:
```javascript
// In your models
userSchema.index({ email: 1 });
complaintSchema.index({ userId: 1, status: 1 });
```

## Scaling Considerations

For high traffic applications:
- Use load balancer (Nginx, AWS ELB)
- Implement caching (Redis)
- Use CDN for static assets
- Consider database replication
- Implement horizontal scaling with multiple instances

## Conclusion

This guide covers multiple deployment options from beginner-friendly platforms like Heroku to advanced VPS setups. Choose the option that best fits your needs and technical expertise.
