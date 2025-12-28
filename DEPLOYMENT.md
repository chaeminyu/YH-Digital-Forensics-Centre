# YHDFC Blog Platform Deployment Guide

This guide covers deploying the YHDFC (YH Digital Forensic Center) blog platform using Docker.

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 2GB RAM minimum (4GB recommended)
- 10GB disk space

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd YHDFC
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Initialize the database**
   ```bash
   docker-compose exec backend python init_admin.py
   ```

5. **Access the application**
   - Website: http://localhost
   - Admin: http://localhost/admin/login
   - API docs: http://localhost/api/docs

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Security
SECRET_KEY=your-super-secret-key-here-change-this-in-production

# Database
DATABASE_URL=sqlite:///./app.db

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000

# Admin Credentials (change these!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Docker Compose Configuration

The `docker-compose.yml` includes:
- **Backend** (FastAPI): Port 8000
- **Frontend** (Next.js): Port 3000  
- **Nginx** (Reverse Proxy): Ports 80/443
- **Volumes** for data persistence

## 📁 Project Structure

```
YHDFC/
├── backend/                 # FastAPI backend
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── main.py
│   └── ...
├── frontend/                # Next.js frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── next.config.ts
│   └── ...
├── docker-compose.yml       # Docker orchestration
├── nginx.conf              # Nginx configuration
└── DEPLOYMENT.md           # This file
```

## 🔄 Deployment Steps

### 1. Production Environment Setup

```bash
# Set production environment
export NODE_ENV=production

# Generate secure secret key
export SECRET_KEY=$(openssl rand -hex 32)

# Configure production database (optional)
export DATABASE_URL=postgresql://user:pass@localhost:5432/yhdfc
```

### 2. SSL/TLS Setup (Production)

1. **Obtain SSL certificates** (Let's Encrypt recommended):
   ```bash
   mkdir ssl
   # Place cert.pem and key.pem in ssl/ directory
   ```

2. **Update nginx.conf** to enable HTTPS:
   - Uncomment the HTTPS server block
   - Update domain names
   - Configure SSL certificate paths

3. **Update docker-compose.yml**:
   ```yaml
   nginx:
     volumes:
       - ./ssl:/etc/nginx/ssl:ro
   ```

### 3. Database Migration (if needed)

```bash
# Backup existing data
docker-compose exec backend cp app.db app.db.backup

# Run migrations (if implemented)
docker-compose exec backend python migrate.py

# Or recreate database
docker-compose exec backend python init_admin.py
```

### 4. Build and Deploy

```bash
# Build images
docker-compose build --no-cache

# Deploy services
docker-compose up -d

# Check service status
docker-compose ps
docker-compose logs -f
```

## 🛠️ Administration

### Admin Access

Default credentials (CHANGE IN PRODUCTION):
- Username: `admin`
- Password: `admin123`

Admin features:
- ✅ Post management (create, edit, delete)
- ✅ Inquiry management
- ✅ File uploads
- ✅ Rich text editor

### Database Management

```bash
# Backup database
docker-compose exec backend cp app.db /tmp/backup-$(date +%Y%m%d).db

# Restore database
docker-compose exec backend cp /path/to/backup.db app.db

# Access database directly
docker-compose exec backend sqlite3 app.db
```

### Log Management

```bash
# View logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx

# Follow logs
docker-compose logs -f --tail=100
```

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check port usage
   netstat -tlnp | grep :80
   
   # Change ports in docker-compose.yml if needed
   ```

2. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Memory issues**
   ```bash
   # Check Docker memory usage
   docker stats
   
   # Increase Docker memory limit
   ```

4. **Build failures**
   ```bash
   # Clear Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

### Health Checks

```bash
# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost:3000

# Check nginx
curl http://localhost/health
```

## 📊 Monitoring

### Service Monitoring

```bash
# Check running containers
docker-compose ps

# Monitor resource usage
docker stats $(docker-compose ps -q)

# Check container health
docker-compose exec backend curl localhost:8000/health
```

### Log Analysis

```bash
# Backend API logs
docker-compose logs backend | grep ERROR

# Frontend access logs
docker-compose logs nginx | grep -E "GET|POST"

# Database operations
docker-compose logs backend | grep "sqlite"
```

## 🔐 Security Considerations

### Production Checklist

- [ ] Change default admin credentials
- [ ] Use strong SECRET_KEY
- [ ] Enable HTTPS with valid certificates
- [ ] Configure firewall (only ports 80, 443)
- [ ] Set up regular database backups
- [ ] Enable container security scanning
- [ ] Use Docker secrets for sensitive data
- [ ] Configure log rotation

### Security Headers

The nginx configuration includes:
- X-Frame-Options
- X-Content-Type-Options  
- X-XSS-Protection
- Strict-Transport-Security

## 🔄 Updates & Maintenance

### Updating the Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database Backups

Set up automated backups:
```bash
# Add to crontab
0 2 * * * docker-compose exec -T backend cp app.db /backups/yhdfc-$(date +\%Y\%m\%d).db
```

## 📞 Support

For deployment issues:

1. Check logs: `docker-compose logs`
2. Verify configuration files
3. Check system resources
4. Review security settings

## 🏷️ Version Information

- **Backend**: FastAPI with SQLite
- **Frontend**: Next.js 14 with TypeScript  
- **Proxy**: Nginx Alpine
- **Container**: Docker & Docker Compose

---

**Note**: This deployment guide covers the basic setup. For high-traffic production environments, consider additional optimizations like database clustering, load balancing, and CDN integration.