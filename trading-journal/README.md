# Trading Journal - Personal F&O Trade Tracker

A comprehensive full-stack web application for tracking Futures and Options (F&O) trades with analytics, strategy insights, and trading psychology journaling.

## 🚀 Features

### 📊 Dashboard
- Total P&L overview
- Win rate statistics
- Equity curve visualization
- Strategy performance metrics
- Recent trade activity

### 🧾 Add New Trade
- Comprehensive trade entry form
- Support for Futures and Options
- Auto-calculated P&L
- Psychology analysis section
- Screenshot upload capability
- Strategy and tag management

### 📚 Journal (Trade History)
- Detailed trade table with filters
- Search and filter functionality
- Expandable trade details
- Psychology insights per trade
- CSV export capability

### 📈 Analytics
- Performance metrics
- Strategy analysis
- Instrument performance
- Monthly performance tracking
- Emotion and mistake frequency analysis
- Trading insights

### 🧠 Psychology Journal
- Daily/weekly mindset reflections
- Emotion tracking
- Discipline rating system
- Improvement planning
- Mindset prompts

### ⚙️ Settings
- User preferences
- Theme customization
- Data export/import
- Account management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts (ready for implementation)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trading-journal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env` file

### Database Setup

The application uses SQLite by default for development. For production, you can switch to PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update your `.env` with PostgreSQL connection string

## 📁 Project Structure

```
src/
├── app/
│   ├── (app)/           # Protected app routes
│   │   ├── page.tsx     # Dashboard
│   │   ├── add-trade/   # Add trade page
│   │   ├── journal/     # Trade history
│   │   ├── analytics/   # Analytics page
│   │   ├── psychology/  # Psychology journal
│   │   └── settings/    # Settings page
│   ├── api/             # API routes
│   └── layout.tsx       # Root layout
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard components
│   ├── trades/         # Trade-related components
│   ├── journal/        # Journal components
│   ├── analytics/      # Analytics components
│   ├── psychology/     # Psychology components
│   └── settings/       # Settings components
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
```

## 🎨 Design System

The application uses a modern dark theme with:
- **Colors**: Dark grays with green accents
- **Typography**: Inter font family
- **Spacing**: Consistent 2xl rounded corners
- **Components**: Modular, reusable design system

## 🔒 Authentication

- Google OAuth integration
- Session management with NextAuth.js
- Protected routes for authenticated users
- User profile management

## 📊 Data Models

### Trade
- Basic trade information (date, instrument, type)
- Price and position details
- Strategy and tags
- Psychology analysis
- Screenshots and notes

### Psychology Entry
- Daily/weekly reflections
- Emotion tracking
- Discipline ratings
- Improvement plans

### User Settings
- Trading preferences
- Display settings
- Theme preferences

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔮 Future Enhancements

- [ ] Real-time market data integration
- [ ] Advanced charting with TradingView
- [ ] Mobile app development
- [ ] Telegram bot integration
- [ ] AI-powered trading insights
- [ ] Portfolio tracking
- [ ] Risk management tools
- [ ] Social trading features

---

Built with ❤️ for traders who want to improve their performance through systematic journaling and analysis.
