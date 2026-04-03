# Library Management MERN Application

This is a full-stack library management application built with:
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB

## Project Structure
- `/server` - Express backend API
- `/client` - React frontend application
- `/server/models` - MongoDB schemas
- `/server/routes` - API endpoints
- `/server/controllers` - Business logic
- `/client/src/components` - React components
- `/client/src/pages` - Page components

## Development Setup

### Backend Setup
```bash
cd server
npm install
```

Create `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend Setup
```bash
cd client
npm install
```

### Running the Application

Terminal 1 (Backend):
```bash
cd server
npm start
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Features
- User authentication with JWT
- Add, update, delete, and search books
- Manage book inventory
- User profile management
- Responsive UI design
