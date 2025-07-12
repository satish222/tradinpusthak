import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity, 
  PlusCircle,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DashboardData, Trade, TradeStats } from '../types';
import { formatCurrency, formatPercentage, formatDate, getColorForPnL } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Mock data for demo
        const mockData: DashboardData = {
          stats: {
            totalPnL: 15432.50,
            totalTrades: 45,
            winningTrades: 28,
            losingTrades: 17,
            winRate: 62.22,
            avgWin: 850.30,
            avgLoss: -425.60,
            maxWin: 2500.00,
            maxLoss: -1200.00,
            profitFactor: 1.89,
            expectancy: 342.94,
            largestDrawdown: -3200.00,
            consecutiveWins: 5,
            consecutiveLosses: 3,
          },
          equityCurve: [
            { date: new Date('2024-01-01'), balance: 50000, pnl: 0, cumulativePnL: 0 },
            { date: new Date('2024-01-02'), balance: 50850, pnl: 850, cumulativePnL: 850 },
            { date: new Date('2024-01-03'), balance: 50425, pnl: -425, cumulativePnL: 425 },
            { date: new Date('2024-01-04'), balance: 51275, pnl: 850, cumulativePnL: 1275 },
            { date: new Date('2024-01-05'), balance: 53775, pnl: 2500, cumulativePnL: 3775 },
            { date: new Date('2024-01-06'), balance: 54200, pnl: 425, cumulativePnL: 4200 },
            { date: new Date('2024-01-07'), balance: 65432, pnl: 850, cumulativePnL: 15432 },
          ],
          strategyPerformance: [
            { strategy: 'Breakout', totalTrades: 15, winningTrades: 10, totalPnL: 5200, winRate: 66.67, avgPnL: 346.67 },
            { strategy: 'Scalping', totalTrades: 20, winningTrades: 12, totalPnL: 4800, winRate: 60.00, avgPnL: 240.00 },
            { strategy: 'Reversal', totalTrades: 10, winningTrades: 6, totalPnL: 5432, winRate: 60.00, avgPnL: 543.20 },
          ],
          emotionHeatmap: [
            { emotion: 'Confidence', frequency: 15, averageImpact: 7.5, associatedPnL: 8500 },
            { emotion: 'Fear', frequency: 12, averageImpact: 6.2, associatedPnL: -3200 },
            { emotion: 'Greed', frequency: 8, averageImpact: 5.8, associatedPnL: -1800 },
          ],
          recentTrades: [
            {
              id: '1',
              userId: '1',
              tradeDate: new Date('2024-01-07'),
              segment: 'Options',
              instrument: 'NIFTY',
              tradeType: 'Buy',
              strikePrice: 21500,
              optionType: 'CE',
              expiryDate: new Date('2024-01-25'),
              productType: 'MIS',
              entryPrice: 125.50,
              exitPrice: 142.30,
              positionSize: 150,
              lots: 2,
              pnl: 2520.00,
              strategy: 'Breakout',
              tags: ['trending', 'high-volume'],
              psychology: {
                moodBefore: 'good',
                confidenceLevel: 8,
                focusLevel: 7,
                emotions: [{ type: 'confidence', intensity: 8 }],
                mistakesMade: [],
                followedRules: true,
                disciplineScore: 8,
                reflectionNotes: 'Good trade with proper risk management',
              },
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: '2',
              userId: '1',
              tradeDate: new Date('2024-01-06'),
              segment: 'Futures',
              instrument: 'BANKNIFTY',
              tradeType: 'Sell',
              productType: 'MIS',
              entryPrice: 46250.00,
              exitPrice: 46180.00,
              positionSize: 15,
              lots: 1,
              pnl: 1050.00,
              strategy: 'Scalping',
              tags: ['quick-profit'],
              psychology: {
                moodBefore: 'neutral',
                confidenceLevel: 6,
                focusLevel: 8,
                emotions: [{ type: 'confidence', intensity: 6 }],
                mistakesMade: [],
                followedRules: true,
                disciplineScore: 7,
                reflectionNotes: 'Quick scalp trade',
              },
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        };
        
        setDashboardData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateRange]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const { stats, equityCurve, strategyPerformance, recentTrades } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your trading overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input text-sm py-2"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Link to="/add-trade" className="btn btn-primary">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Trade
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total P&L</p>
              <p className={`text-2xl font-bold ${getColorForPnL(stats.totalPnL)}`}>
                {formatCurrency(stats.totalPnL)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${stats.totalPnL >= 0 ? 'bg-success-100' : 'bg-danger-100'}`}>
              {stats.totalPnL >= 0 ? (
                <TrendingUp className="w-6 h-6 text-success-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-danger-600" />
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatPercentage(stats.winRate)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-primary-100">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Trades</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalTrades}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profit Factor</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.profitFactor.toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <ArrowUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Curve */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Equity Curve</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={equityCurve}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => formatDate(value, 'MMM dd')}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => formatDate(value)}
                formatter={(value) => [formatCurrency(value as number), 'Balance']}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ fill: '#0ea5e9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Strategy Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Strategy Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={strategyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="strategy" />
              <YAxis />
              <Tooltip formatter={(value) => [formatCurrency(value as number), 'P&L']} />
              <Bar dataKey="totalPnL" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Trades</h3>
          <Link to="/journal" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Instrument
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Strategy
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  P&L
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentTrades.map((trade) => (
                <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatDate(trade.tradeDate, 'MMM dd')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {trade.instrument}
                    {trade.strikePrice && (
                      <span className="ml-1 text-xs text-gray-500">
                        {trade.strikePrice} {trade.optionType}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {trade.tradeType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {trade.strategy}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={getColorForPnL(trade.pnl)}>
                      {formatCurrency(trade.pnl)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;