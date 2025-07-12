# Trading Pusthak 📈

A comprehensive personal trading journal web application for Futures and Options (F&O) traders. Track your trades, analyze performance, and improve your trading psychology.

## ✨ Features

### 🎯 Core Features
- **Dashboard**: Real-time overview of your trading performance
- **Trade Management**: Add, edit, and track all your F&O trades
- **Journal**: Comprehensive trade history with advanced filtering
- **Analytics**: In-depth performance analysis with charts
- **Psychology Tracking**: Monitor your trading mindset and emotions
- **Settings**: Customize your trading preferences

### 📊 Analytics & Insights
- Total P&L tracking
- Win rate analysis
- Equity curve visualization
- Strategy performance comparison
- Emotion heatmap
- Profit factor calculation
- Risk-reward analysis

### 🧠 Psychology Features
- Pre-trade mood tracking
- Confidence and focus level monitoring
- Emotion intensity mapping
- Mistake logging
- Discipline scoring
- Reflection notes
- Weekly psychology reviews

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** for form management
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Express Validator** for input validation
- **Helmet** for security
- **Rate Limiting** for API protection

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB (v5 or later)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trading-pusthak.git
   cd trading-pusthak
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/trading-pusthak
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start MongoDB**
   ```bash
   # If using MongoDB locally
   mongod
   ```

6. **Run the Application**
   
   Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   
   Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 📱 Usage

### Demo Mode
The application includes a demo mode that works without a backend connection:
- Use any email and password to login
- Explore all features with sample data
- Perfect for testing and demonstration

### Adding Your First Trade
1. Navigate to the "Add Trade" page
2. Fill in the trade details:
   - Date and time
   - Instrument (NIFTY, BANKNIFTY, etc.)
   - Trade type (Buy/Sell)
   - Entry and exit prices
   - Position size and lots
   - Strategy used
3. Complete the psychology section:
   - Rate your mood and confidence
   - Log emotions and intensity
   - Note any mistakes made
   - Add reflection notes
4. Save the trade

### Viewing Analytics
- **Dashboard**: Quick overview of recent performance
- **Analytics Page**: Detailed charts and statistics
- **Journal**: Searchable trade history
- **Psychology Page**: Emotional tracking and insights

## 🎨 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Add Trade
![Add Trade](screenshots/add-trade.png)

### Analytics
![Analytics](screenshots/analytics.png)

### Psychology Tracking
![Psychology](screenshots/psychology.png)

## 🔧 Configuration

### Frontend Configuration
- **API Base URL**: Set `REACT_APP_API_URL` in `.env`
- **Theme**: Light/Dark mode toggle available
- **Time Format**: 12h/24h format options

### Backend Configuration
- **Database**: MongoDB connection string
- **JWT**: Secret key and expiration
- **File Upload**: Maximum file size and upload path
- **Rate Limiting**: Window and max requests configuration

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

### Trade Endpoints
- `GET /api/trades` - Get all trades (with pagination)
- `POST /api/trades` - Create new trade
- `GET /api/trades/:id` - Get specific trade
- `PUT /api/trades/:id` - Update trade
- `DELETE /api/trades/:id` - Delete trade

### Analytics Endpoints
- `GET /api/analytics/dashboard` - Dashboard data
- `GET /api/analytics/stats` - Trading statistics
- `GET /api/analytics/equity-curve` - Equity curve data
- `GET /api/analytics/strategy-performance` - Strategy analysis

## 🏗️ Project Structure

```
trading-pusthak/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   └── UI/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is for educational and personal use only. Trading in financial markets involves substantial risk of loss. Past performance is not indicative of future results. Always consult with a qualified financial advisor before making trading decisions.

## 🙏 Acknowledgments

- Built with ❤️ for the trading community
- Icons by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)

## 📞 Support

For support, email support@tradingpusthak.com or join our Discord community.

---

**Happy Trading! 🚀**