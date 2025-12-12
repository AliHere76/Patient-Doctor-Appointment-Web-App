# Healthcare Appointment System

A microservices-based healthcare appointment system with real-time notifications.

## Architecture

- **Frontend**: Next.js (Port 3010)
- **Auth Service**: Express.js (Port 3001)
- **Appointment Service**: Express.js with Kafka (Port 3002)
- **Notification Service**: Express.js with Socket.IO (Port 3003)
- **Infrastructure**: PostgreSQL, Redis, Kafka

## Quick Start with Docker

### Prerequisites
- Docker Desktop installed and running
- Docker Compose

### Steps

1. **Start all services:**
   ```powershell
   docker-compose up -d
   ```

2. **Check service status:**
   ```powershell
   docker-compose ps
   ```

3. **View logs:**
   ```powershell
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f auth-service
   ```

4. **Initialize databases:**
   ```powershell
   # Auth service
   docker-compose exec auth-service npm run db:init
   
   # Appointment service
   docker-compose exec appointment-service npm run db:init
   
   # Notification service
   docker-compose exec notification-service npm run db:init
   ```

5. **Access the application:**
   - Frontend: http://localhost:3010
   - Auth Service: http://localhost:3001/health
   - Appointment Service: http://localhost:3002/health
   - Notification Service: http://localhost:3003/health

### Stop Services

```powershell
# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

## Manual Setup (Without Docker)

See the detailed instructions in the main documentation for running services individually with WSL, Redis, and Kafka.

## Services Overview

### Auth Service (Port 3001)
- User registration and login
- JWT-based authentication
- Google OAuth integration
- User management

### Appointment Service (Port 3002)
- Create, update, cancel appointments
- Kafka producer for events
- Rate limiting with Redis

### Notification Service (Port 3003)
- Real-time notifications via Socket.IO
- Kafka consumer for appointment events
- Notification history

### Frontend (Port 3010)
- Next.js with TypeScript
- Role-based dashboards (Admin, Doctor, Patient)
- Real-time notification updates
- Appointment booking and management

## Environment Variables

All services use environment variables defined in `docker-compose.yml`. For production, update the secrets:
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `COOKIE_SECRET`
- `POSTGRES_PASSWORD`

## Troubleshooting

### Services not connecting
```powershell
docker-compose restart
```

### Database connection issues
```powershell
# Check if PostgreSQL is healthy
docker-compose ps postgres

# Restart PostgreSQL
docker-compose restart postgres
```

### Kafka issues
```powershell
# Restart Kafka and Zookeeper
docker-compose restart zookeeper kafka
```

### View service logs
```powershell
docker-compose logs -f [service-name]
```
