# DevForces

A competitive programming platform similar to Codeforces, built with modern web technologies.

## Features

- 🔐 **User Authentication** - JWT-based login and registration
- 📚 **Problem Archive** - Browse and solve programming problems
- 🏆 **Contests** - Participate in coding competitions
- ⚡ **Auto Judge** - Automated code evaluation with Docker sandbox
- 📊 **Rating System** - Track user performance and rankings
- 🏅 **Leaderboards** - Global and contest-specific rankings
- 📝 **Blog System** - Share insights and tutorials
- 👨‍💼 **Admin Panel** - Platform management interface

## Technology Stack

### Frontend
- **React** with TypeScript
- **React Router** for navigation
- **Axios** for API communication
- **CSS** for styling (Tailwind integration planned)

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** database
- **Sequelize** ORM
- **JWT** for authentication
- **bcrypt** for password hashing

### Infrastructure
- **Docker** containers for code execution
- **PostgreSQL** for data persistence
- **Docker Compose** for development environment

## Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/menacingly-coded/DevForces.git
cd DevForces
```

2. Start the development environment:
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 3001
- Frontend app on port 3000
- Judge service on port 3002

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database: postgresql://devforces_user:devforces_pass@localhost:5432/devforces

### Manual Setup (Alternative)

#### Backend Setup
```bash
cd backend
npm install
npm run build
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### Database Setup
```bash
# Create PostgreSQL database and run the init script
psql -U postgres -d devforces -f backend/database/init.sql
```

## Project Structure

```
DevForces/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   └── utils/      # Utility functions
│   └── public/
├── backend/            # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/# Request handlers
│   │   ├── models/     # Database models
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Express middleware
│   │   └── utils/      # Helper functions
│   └── database/       # Database scripts
├── docker/             # Docker configurations
│   ├── judge/          # Code execution service
│   └── submissions/    # Submission storage
└── docker-compose.yml  # Development environment
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Problems
- `GET /api/problems` - List problems
- `GET /api/problems/:id` - Get problem details
- `POST /api/problems` - Create problem (admin)

### Contests
- `GET /api/contests` - List contests
- `GET /api/contests/:id` - Get contest details
- `POST /api/contests` - Create contest (admin)

### Submissions
- `POST /api/submissions` - Submit solution
- `GET /api/submissions/:id` - Get submission status

### Users
- `GET /api/users/rankings` - User leaderboard
- `GET /api/users/:id` - User profile

### Admin
- `GET /api/admin/dashboard` - Admin statistics
- `GET /api/admin/users` - Manage users
- `GET /api/admin/problems` - Manage problems

## Development Status

### ✅ Completed
- [x] Project structure and Docker setup
- [x] Basic backend API with authentication
- [x] Frontend routing and basic UI
- [x] Database schema and models
- [x] Docker judge service foundation

### 🚧 In Progress
- [ ] Complete authentication integration
- [ ] Problem management system
- [ ] Code submission and judging
- [ ] Contest system implementation
- [ ] Rating calculations
- [ ] Blog system

### 📋 Planned
- [ ] Advanced judge features (memory monitoring)
- [ ] Real-time contest updates
- [ ] Advanced UI with Tailwind CSS
- [ ] File upload for test cases
- [ ] Email notifications
- [ ] Advanced analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Default Credentials

- **Admin User**: 
  - Username: `admin`
  - Password: `password123`
  - Email: `admin@devforces.com`

- **Test User**:
  - Username: `testuser`
  - Password: `password123`
  - Email: `test@devforces.com`

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open a GitHub issue or contact the development team.