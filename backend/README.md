# Pi Network Backend API

A Node.js/Express.js backend for the Pi Network messaging system. This backend provides APIs for message handling and admin functionality.

## Features

- 💬 **Message Management**: Store and retrieve user messages
- 👑 **Admin Dashboard**: Comprehensive admin interface
- 📊 **Analytics**: Message statistics and trends
- 🔒 **Security**: Input validation, CORS, helmet protection
- 📄 **Database**: SQLite database with proper schema
- 🚀 **Performance**: Pagination, filtering, and rate limiting

## Quick Start

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env file with your configuration
```

### 3. Initialize Database

```bash
npm run init-db
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Messages API
- `POST /api/messages` - Send a new message
- `GET /api/messages` - Get all messages (with pagination)
- `GET /api/messages/count` - Get message counts
- `GET /api/messages/:id` - Get specific message
- `DELETE /api/messages/:id` - Delete message (admin)

### Admin API
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/messages` - Advanced message filtering
- `GET /api/admin/stats` - Detailed statistics
- `POST /api/admin/cleanup` - Clean up old messages

## Request Examples

### Send Message
```bash
curl -X POST http://localhost:3001/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, this is a test message from the Pi Network app!",
    "userIdentifier": "user_123"
  }'
```

### Get Messages (Admin)
```bash
curl http://localhost:3001/api/messages?page=1&limit=10
```

### Get Dashboard Data
```bash
curl http://localhost:3001/api/admin/dashboard
```

## Database Schema

```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_identifier TEXT,
  message_content TEXT NOT NULL,
  word_count INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3001` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `DB_PATH` | Database file path | `./data/messages.db` |

### Features

- **Input Validation**: Comprehensive validation for all inputs
- **Rate Limiting**: Prevents API abuse
- **CORS**: Properly configured for frontend integration
- **Security**: Helmet.js for security headers
- **Error Handling**: Proper error responses and logging
- **Pagination**: Efficient data loading with pagination
- **Filtering**: Advanced search and filter capabilities

## Frontend Integration

Update your frontend API calls to point to the backend:

```javascript
// Instead of '/api/messages'
const response = await fetch('http://localhost:3001/api/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Your message here',
    userIdentifier: 'user_123'
  })
});
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up nginx reverse proxy
4. Configure SSL certificates
5. Set up database backups

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run init-db` - Initialize database

## File Structure

```
backend/
├── data/              # Database files (auto-created)
├── database/          # Database configuration
├── middleware/        # Custom middleware
├── routes/           # API routes
├── scripts/          # Utility scripts
├── server.js         # Main server file
├── package.json      # Dependencies
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
