"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { cn } from "@/utils/cn"
import { formatCurrency, formatPercentage } from "@/utils/format"

interface DashboardStats {
  totalPnL: number
  winRate: number
  totalTrades: number
  winningTrades: number
  losingTrades: number
  averageWin: number
  averageLoss: number
  profitFactor: number
}

export function Dashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    totalPnL: 0,
    winRate: 0,
    totalTrades: 0,
    winningTrades: 0,
    losingTrades: 0,
    averageWin: 0,
    averageLoss: 0,
    profitFactor: 0,
  })

  useEffect(() => {
    // TODO: Fetch actual data from API
    // For now, using mock data
    setStats({
      totalPnL: 125000,
      winRate: 68.5,
      totalTrades: 45,
      winningTrades: 31,
      losingTrades: 14,
      averageWin: 8500,
      averageLoss: -3200,
      profitFactor: 2.65,
    })
  }, [])

  const metricCards = [
    {
      title: "Total P&L",
      value: formatCurrency(stats.totalPnL),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Win Rate",
      value: `${stats.winRate}%`,
      change: "+5.2%",
      changeType: "positive" as const,
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Trades",
      value: stats.totalTrades.toString(),
      change: "+8",
      changeType: "positive" as const,
      icon: BarChart3,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Profit Factor",
      value: stats.profitFactor.toFixed(2),
      change: "+0.3",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back to Trading Pusthak, {session?.user?.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Last updated</p>
          <p className="text-sm text-white">Just now</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card) => (
          <div
            key={card.title}
            className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-xl", card.bgColor)}>
                <card.icon className={cn("h-6 w-6", card.color)} />
              </div>
              <div className="flex items-center space-x-1">
                {card.changeType === "positive" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    card.changeType === "positive" ? "text-green-500" : "text-red-500"
                  )}
                >
                  {card.change}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-sm text-gray-400">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equity Curve */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Equity Curve</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-gray-400">Chart coming soon</p>
            </div>
          </div>
        </div>

        {/* Strategy Performance */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Strategy Performance</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-400">Chart coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-800 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-white font-medium">NIFTY 50 CE</p>
                  <p className="text-sm text-gray-400">Breakout Strategy</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-500 font-medium">+₹8,500</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}