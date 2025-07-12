"use client"

import { useState, useEffect } from "react"
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Calendar,
  DollarSign,
  Target,
  Brain,
  Filter
} from "lucide-react"
import { cn } from "@/utils/cn"
import { formatCurrency, formatPercentage } from "@/utils/format"

interface AnalyticsData {
  totalPnL: number
  winRate: number
  totalTrades: number
  averageWin: number
  averageLoss: number
  profitFactor: number
  maxDrawdown: number
  sharpeRatio: number
  strategyPerformance: Array<{
    strategy: string
    trades: number
    pnl: number
    winRate: number
  }>
  instrumentPerformance: Array<{
    instrument: string
    trades: number
    pnl: number
    winRate: number
  }>
  monthlyPerformance: Array<{
    month: string
    pnl: number
    trades: number
  }>
  emotionFrequency: Array<{
    emotion: string
    count: number
  }>
  mistakeFrequency: Array<{
    mistake: string
    count: number
  }>
}

const mockAnalyticsData: AnalyticsData = {
  totalPnL: 125000,
  winRate: 68.5,
  totalTrades: 45,
  averageWin: 8500,
  averageLoss: -3200,
  profitFactor: 2.65,
  maxDrawdown: -15000,
  sharpeRatio: 1.8,
  strategyPerformance: [
    { strategy: "Breakout", trades: 15, pnl: 45000, winRate: 73.3 },
    { strategy: "Support/Resistance", trades: 12, pnl: 32000, winRate: 66.7 },
    { strategy: "Trend Following", trades: 8, pnl: 28000, winRate: 75.0 },
    { strategy: "Mean Reversion", trades: 6, pnl: 15000, winRate: 50.0 },
    { strategy: "Expiry Trade", trades: 4, pnl: 5000, winRate: 75.0 },
  ],
  instrumentPerformance: [
    { instrument: "NIFTY", trades: 25, pnl: 75000, winRate: 72.0 },
    { instrument: "BANKNIFTY", trades: 15, pnl: 40000, winRate: 66.7 },
    { instrument: "FINNIFTY", trades: 5, pnl: 10000, winRate: 60.0 },
  ],
  monthlyPerformance: [
    { month: "Jan", pnl: 25000, trades: 8 },
    { month: "Feb", pnl: 18000, trades: 6 },
    { month: "Mar", pnl: 32000, trades: 10 },
    { month: "Apr", pnl: 15000, trades: 5 },
    { month: "May", pnl: 28000, trades: 9 },
    { month: "Jun", pnl: 6000, trades: 7 },
  ],
  emotionFrequency: [
    { emotion: "Confidence", count: 25 },
    { emotion: "Fear", count: 12 },
    { emotion: "Greed", count: 8 },
    { emotion: "Calm", count: 20 },
    { emotion: "Excitement", count: 15 },
    { emotion: "Anxiety", count: 10 },
  ],
  mistakeFrequency: [
    { mistake: "No Stop Loss", count: 8 },
    { mistake: "Early Entry", count: 12 },
    { mistake: "Late Exit", count: 6 },
    { mistake: "Revenge Trading", count: 4 },
    { mistake: "Over Trading", count: 10 },
    { mistake: "Emotional Decision", count: 7 },
  ],
}

export function Analytics() {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData)
  const [dateRange, setDateRange] = useState("6m")
  const [selectedInstrument, setSelectedInstrument] = useState("")

  useEffect(() => {
    // TODO: Fetch analytics data based on filters
    console.log("Fetching analytics data for:", { dateRange, selectedInstrument })
  }, [dateRange, selectedInstrument])

  const topStrategy = data.strategyPerformance.reduce((prev, current) => 
    prev.pnl > current.pnl ? prev : current
  )

  const topInstrument = data.instrumentPerformance.reduce((prev, current) => 
    prev.pnl > current.pnl ? prev : current
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Deep dive into your trading performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
            <option value="all">All Time</option>
          </select>
          <select
            value={selectedInstrument}
            onChange={(e) => setSelectedInstrument(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Instruments</option>
            {data.instrumentPerformance.map((instrument) => (
              <option key={instrument.instrument} value={instrument.instrument}>
                {instrument.instrument}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total P&L</p>
              <p className={cn(
                "text-2xl font-bold",
                data.totalPnL > 0 ? "text-green-500" : "text-red-500"
              )}>
                {formatCurrency(data.totalPnL)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-2xl font-bold text-white">{data.winRate}%</p>
            </div>
            <Target className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Profit Factor</p>
              <p className="text-2xl font-bold text-white">{data.profitFactor}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Trades</p>
              <p className="text-2xl font-bold text-white">{data.totalTrades}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategy Performance */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Strategy Performance</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {data.strategyPerformance.map((strategy) => (
              <div key={strategy.strategy} className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                <div>
                  <p className="text-white font-medium">{strategy.strategy}</p>
                  <p className="text-sm text-gray-400">{strategy.trades} trades • {strategy.winRate}% win rate</p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-medium",
                    strategy.pnl > 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {formatCurrency(strategy.pnl)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instrument Performance */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Instrument Performance</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {data.instrumentPerformance.map((instrument) => (
              <div key={instrument.instrument} className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
                <div>
                  <p className="text-white font-medium">{instrument.instrument}</p>
                  <p className="text-sm text-gray-400">{instrument.trades} trades • {instrument.winRate}% win rate</p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-medium",
                    instrument.pnl > 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {formatCurrency(instrument.pnl)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Monthly Performance</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.monthlyPerformance.map((month) => (
            <div key={month.month} className="text-center p-4 bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-400">{month.month}</p>
              <p className={cn(
                "text-lg font-bold mt-1",
                month.pnl > 0 ? "text-green-500" : "text-red-500"
              )}>
                {formatCurrency(month.pnl)}
              </p>
              <p className="text-xs text-gray-400 mt-1">{month.trades} trades</p>
            </div>
          ))}
        </div>
      </div>

      {/* Psychology Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emotion Frequency */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Emotion Frequency</h3>
            <Brain className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {data.emotionFrequency.map((emotion) => (
              <div key={emotion.emotion} className="flex items-center justify-between">
                <span className="text-white">{emotion.emotion}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(emotion.count / Math.max(...data.emotionFrequency.map(e => e.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-8">{emotion.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mistake Frequency */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Mistake Frequency</h3>
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {data.mistakeFrequency.map((mistake) => (
              <div key={mistake.mistake} className="flex items-center justify-between">
                <span className="text-white">{mistake.mistake}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(mistake.count / Math.max(...data.mistakeFrequency.map(m => m.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-8">{mistake.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Trading Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-800 rounded-xl">
            <h4 className="text-sm font-semibold text-white mb-2">Best Strategy</h4>
            <p className="text-green-500 font-medium">{topStrategy.strategy}</p>
            <p className="text-sm text-gray-400">{formatCurrency(topStrategy.pnl)} • {topStrategy.winRate}% win rate</p>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-xl">
            <h4 className="text-sm font-semibold text-white mb-2">Best Instrument</h4>
            <p className="text-blue-500 font-medium">{topInstrument.instrument}</p>
            <p className="text-sm text-gray-400">{formatCurrency(topInstrument.pnl)} • {topInstrument.winRate}% win rate</p>
          </div>
          
          <div className="p-4 bg-gray-800 rounded-xl">
            <h4 className="text-sm font-semibold text-white mb-2">Risk Metrics</h4>
            <p className="text-orange-500 font-medium">Max Drawdown: {formatCurrency(data.maxDrawdown)}</p>
            <p className="text-sm text-gray-400">Sharpe Ratio: {data.sharpeRatio}</p>
          </div>
        </div>
      </div>
    </div>
  )
}