# YHDFC Blog Platform

A professional blog platform for YH Digital Forensic Center, built with modern web technologies.

## 🚀 Features

### Frontend (Next.js 14)
- ✅ Professional dark theme design
- ✅ Responsive layout for all devices
- ✅ Homepage with company overview
- ✅ About page with company information
- ✅ Digital forensics service pages
- ✅ Blog with search and filtering
- ✅ Press releases and media coverage
- ✅ Corporate training programs
- ✅ Contact form with inquiry management
- ✅ SEO optimized with metadata
- ✅ Smooth animations with Framer Motion

### Backend (FastAPI)
- ✅ RESTful API with automatic docs
- ✅ JWT authentication for admin users
- ✅ Post management (CRUD operations)
- ✅ Category and tag system
- ✅ Contact inquiry management
- ✅ File upload functionality
- ✅ Database with SQLAlchemy ORM
- ✅ CORS configuration
- ✅ Health check endpoints

### Admin System
- ✅ Secure admin authentication
- ✅ Post creation and management
- ✅ Rich text editor with Tiptap
- ✅ Inquiry management dashboard
- ✅ File upload capabilities
- ✅ Statistics and analytics

## 🛠️ Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

**Backend:**
- FastAPI
- SQLAlchemy ORM
- SQLite (development) / PostgreSQL (production)
- JWT Authentication
- Python 3.11+

**Deployment:**
- Docker & Docker Compose
- Nginx (reverse proxy)
- Multi-stage builds for optimization

## 🏃‍♂️ Quick Start

### Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd YHDFC
   ```

2. **Backend setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python init_admin.py
   uvicorn main:app --reload
   ```

3. **Frontend setup** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin: http://localhost:3000/admin/login

### Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

Quick Docker deployment:
```bash
docker-compose up -d
docker-compose exec backend python init_admin.py
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///./app.db
NEXT_PUBLIC_API_URL=http://localhost:8000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Default Admin Credentials

- **Username**: admin
- **Password**: admin123

**⚠️ Change these credentials in production!**

## 📁 Project Structure

```
YHDFC/
├── backend/                 # FastAPI backend
│   ├── models/             # Database models
│   ├── routers/            # API endpoints
│   ├── schemas/            # Pydantic schemas
│   ├── auth.py             # Authentication
│   ├── database.py         # Database setup
│   └── main.py             # FastAPI app
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   └── components/    # Reusable components
│   ├── public/            # Static assets
│   └── tailwind.config.ts # Tailwind setup
├── docker-compose.yml     # Docker orchestration
├── nginx.conf            # Nginx configuration
└── DEPLOYMENT.md         # Deployment guide
```

## 🎯 API Endpoints

### Public Endpoints
- `GET /api/posts` - List blog posts
- `GET /api/posts/{slug}` - Get post by slug
- `GET /api/categories` - List categories
- `POST /api/inquiries` - Submit contact form

### Admin Endpoints
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/posts` - List posts (admin)
- `POST /api/admin/posts` - Create post
- `PUT /api/admin/posts/{id}` - Update post
- `DELETE /api/admin/posts/{id}` - Delete post
- `GET /api/admin/inquiries` - List inquiries

## 🎨 Design Features

- **Professional dark theme** suitable for B2B clients
- **Cyber-security aesthetic** with accent colors
- **Responsive design** for mobile, tablet, desktop
- **Accessibility features** with proper contrast and navigation
- **Loading states** and error handling
- **Smooth animations** for enhanced user experience

## 🧪 Testing

### Manual Testing Checklist

- [x] Homepage loads correctly
- [x] All navigation links work
- [x] Blog posts display and are searchable
- [x] Contact form submits successfully
- [x] Admin login works
- [x] Admin can create/edit posts
- [x] Responsive design on mobile
- [x] API endpoints return expected data

### API Testing
```bash
# Test public endpoints
curl http://localhost:8000/api/posts
curl http://localhost:8000/health

# Test admin login
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"
```

## 🚢 Deployment

The platform is production-ready with:
- Docker containerization
- Nginx reverse proxy
- SSL/TLS support
- Health checks
- Log management
- Backup strategies

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for YH Digital Forensic Center.

## 📞 Support

For technical support or questions:
- Check the deployment documentation
- Review the API documentation at `/api/docs`
- Verify configuration settings

---

**Built with ❤️ for YH Digital Forensic Center**