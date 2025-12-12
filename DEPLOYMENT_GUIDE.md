# 🚀 Quick Deployment Guide (For Viva)

## ⚡ FASTEST PATH - 30 Minutes Total

### Option 1: Local Demo (RECOMMENDED - 5 minutes)
**This is the safest option for your viva!**

```powershell
# Just run Docker Compose
docker-compose up -d

# Wait 2 minutes, then initialize databases
docker-compose exec auth-service npm run db:init
docker-compose exec appointment-service npm run db:init
docker-compose exec notification-service npm run db:init

# Access at http://localhost:3010
```

---

### Option 2: Deploy to Cloud (If Required)

## 📋 Prerequisites
1. GitHub account
2. Vercel account (free) - https://vercel.com
3. Render account (free) - https://render.com

---

## 🎯 Step-by-Step Deployment

### Part 1: Push to GitHub (2 minutes)

```powershell
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit for deployment"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

### Part 2: Deploy Backend to Render (15 minutes)

> [!WARNING]
> **IMPORTANT**: Render's free tier has limitations:
> - Services spin down after 15 minutes of inactivity
> - First request after spin-down takes 30-60 seconds
> - Kafka is NOT available on free tier

#### Simplified Deployment (Without Kafka)

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `healthcare-db`
   - Database: `healthcare`
   - User: `healthcare_user`
   - Region: Singapore (closest to you)
   - Plan: **Free**
   - Click "Create Database"
   - **Save the connection details!**

3. **Create Redis Instance**:
   - Click "New +" → "Redis"
   - Name: `healthcare-redis`
   - Region: Singapore
   - Plan: **Free**
   - Click "Create Redis"

4. **Deploy Auth Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Name: `healthcare-auth-service`
   - Region: Singapore
   - Branch: `main`
   - Root Directory: `services/auth-service`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: **Free**
   - Add Environment Variables:
     ```
     PORT=3001
     NODE_ENV=production
     DB_HOST=[from PostgreSQL connection]
     DB_PORT=[from PostgreSQL connection]
     DB_NAME=auth_db
     DB_USER=[from PostgreSQL connection]
     DB_PASSWORD=[from PostgreSQL connection]
     REDIS_HOST=[from Redis connection]
     REDIS_PORT=[from Redis connection]
     JWT_SECRET=your_secret_key_123
     JWT_EXPIRES_IN=7d
     JWT_REFRESH_SECRET=your_refresh_secret_456
     JWT_REFRESH_EXPIRES_IN=30d
     COOKIE_SECRET=your_cookie_secret_789
     FRONTEND_URL=[will add after Vercel deployment]
     ```
   - Click "Create Web Service"

5. **Repeat for Appointment Service**:
   - Root Directory: `services/appointment-service`
   - Name: `healthcare-appointment-service`
   - Same environment variables (adjust DB_NAME to `appointment_db`)
   - **Skip KAFKA variables** for quick demo

6. **Repeat for Notification Service**:
   - Root Directory: `services/notification-service`
   - Name: `healthcare-notification-service`
   - Same environment variables (adjust DB_NAME to `notification_db`)
   - **Skip KAFKA variables** for quick demo

7. **Initialize Databases**:
   - Once services are deployed, go to each service's "Shell" tab
   - Run: `npm run db:init`

---

### Part 3: Deploy Frontend to Vercel (5 minutes)

1. **Go to Vercel**: https://vercel.com/new

2. **Import Git Repository**:
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=[Your Render auth service URL]
   NEXT_PUBLIC_APPOINTMENT_API_URL=[Your Render appointment service URL]
   NEXT_PUBLIC_NOTIFICATION_API_URL=[Your Render notification service URL]
   NEXT_PUBLIC_SOCKET_URL=[Your Render notification service URL]
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Copy your Vercel URL

6. **Update Backend Services**:
   - Go back to Render
   - Update `FRONTEND_URL` in all three services to your Vercel URL
   - Services will auto-redeploy

---

## 🎓 For Your Viva

### What to Show:
1. **Architecture Diagram** - Explain microservices setup
2. **Live Demo** - Show the working application
3. **Code Walkthrough** - Explain key features:
   - JWT Authentication
   - Real-time notifications (Socket.IO)
   - Event-driven architecture (Kafka - mention even if not deployed)
   - Rate limiting with Redis
   - Microservices communication

### If Deployment Fails:
- **Use Docker locally** - It's perfectly acceptable!
- Show `docker-compose.yml` to demonstrate deployment knowledge
- Explain how it would be deployed in production

---

## ⚠️ Important Notes

### Free Tier Limitations:
- **Render**: Services sleep after 15 min inactivity
- **Vercel**: 100GB bandwidth/month
- **No Kafka on free tier** - Mention this is for production

### Quick Fixes:
```powershell
# If services are slow
# This is normal on free tier - first request wakes them up

# If database connection fails
# Check environment variables in Render dashboard

# If CORS errors
# Ensure FRONTEND_URL is set correctly in all backend services
```

---

## 🆘 Emergency Fallback

If cloud deployment fails, **use Docker locally**:

```powershell
docker-compose up -d
# Wait 2 minutes
docker-compose exec auth-service npm run db:init
docker-compose exec appointment-service npm run db:init
docker-compose exec notification-service npm run db:init
```

Access at: http://localhost:3010

---

## 📊 What to Mention in Viva

1. **Microservices Architecture**
   - Separation of concerns
   - Independent scaling
   - Technology diversity

2. **Technologies Used**:
   - Next.js (Frontend)
   - Express.js (Backend)
   - PostgreSQL (Database)
   - Redis (Caching & Rate Limiting)
   - Kafka (Event Streaming)
   - Socket.IO (Real-time Communication)
   - Docker (Containerization)

3. **Deployment Strategy**:
   - Frontend: Vercel (CDN, Edge Functions)
   - Backend: Render (Container-based)
   - Databases: Managed services
   - Production: Would use AWS/GCP with Kubernetes

4. **Security Features**:
   - JWT authentication
   - Password hashing (bcrypt)
   - Rate limiting
   - CORS protection
   - Environment variables for secrets

---

## ✅ Pre-Viva Checklist

- [ ] Application running (locally or cloud)
- [ ] Can register a new user
- [ ] Can login
- [ ] Can create an appointment
- [ ] Can see notifications
- [ ] Understand the architecture
- [ ] Know the tech stack
- [ ] Can explain deployment process

**Good luck with your viva! 🎉**
