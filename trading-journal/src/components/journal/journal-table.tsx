"use client"

import { useState, useEffect } from "react"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import { cn } from "@/utils/cn"
import { formatDate, formatCurrency } from "@/utils/format"

interface Trade {
  id: string
  tradeDate: string
  segment: string
  instrument: string
  tradeType: string
  strikePrice?: number
  optionType?: string
  expiryDate?: string
  productType: string
  entryPrice: number
  exitPrice?: number
  positionSize: number
  pnl?: number
  strategy?: string
  tags?: string
  notes?: string
  moodBeforeTrade?: string
  confidenceLevel?: number
  focusLevel?: number
  emotionsFelt?: string
  mistakesMade?: string
  followedRules?: boolean
  disciplineScore?: number
  reflectionNotes?: string
}

const mockTrades: Trade[] = [
  {
    id: "1",
    tradeDate: "2024-01-15T09:30:00",
    segment: "Options",
    instrument: "NIFTY",
    tradeType: "Buy",
    strikePrice: 19500,
    optionType: "CE",
    expiryDate: "2024-01-25",
    productType: "MIS",
    entryPrice: 150,
    exitPrice: 180,
    positionSize: 1,
    pnl: 1500,
    strategy: "Breakout",
    tags: "breakout, momentum",
    notes: "Strong breakout above resistance",
    moodBeforeTrade: "😊 Confident",
    confidenceLevel: 8,
    focusLevel: 9,
    emotionsFelt: "Confidence, Excitement",
    mistakesMade: "",
    followedRules: true,
    disciplineScore: 9,
    reflectionNotes: "Good execution, followed the plan perfectly"
  },
  {
    id: "2",
    tradeDate: "2024-01-14T14:15:00",
    segment: "Options",
    instrument: "BANKNIFTY",
    tradeType: "Sell",
    strikePrice: 44000,
    optionType: "PE",
    expiryDate: "2024-01-18",
    productType: "MIS",
    entryPrice: 200,
    exitPrice: 150,
    positionSize: 1,
    pnl: 2500,
    strategy: "Support/Resistance",
    tags: "support, reversal",
    notes: "Bounced off strong support level",
    moodBeforeTrade: "😐 Neutral",
    confidenceLevel: 6,
    focusLevel: 7,
    emotionsFelt: "Calm, Focus",
    mistakesMade: "Late Entry",
    followedRules: true,
    disciplineScore: 7,
    reflectionNotes: "Should have entered earlier when support was tested"
  },
  {
    id: "3",
    tradeDate: "2024-01-13T10:45:00",
    segment: "Futures",
    instrument: "NIFTY",
    tradeType: "Buy",
    expiryDate: "2024-01-25",
    productType: "NRML",
    entryPrice: 19450,
    exitPrice: 19300,
    positionSize: 1,
    pnl: -7500,
    strategy: "Trend Following",
    tags: "trend, momentum",
    notes: "Trend reversal caught me off guard",
    moodBeforeTrade: "😰 Nervous",
    confidenceLevel: 4,
    focusLevel: 5,
    emotionsFelt: "Fear, Anxiety",
    mistakesMade: "No Stop Loss, Emotional Decision",
    followedRules: false,
    disciplineScore: 3,
    reflectionNotes: "Never trade without stop loss. Emotions got the better of me."
  }
]

export function JournalTable() {
  const [trades, setTrades] = useState<Trade[]>(mockTrades)
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>(mockTrades)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInstrument, setSelectedInstrument] = useState("")
  const [selectedStrategy, setSelectedStrategy] = useState("")
  const [pnlFilter, setPnlFilter] = useState("")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const instruments = Array.from(new Set(trades.map(t => t.instrument)))
  const strategies = Array.from(new Set(trades.map(t => t.strategy).filter(Boolean)))

  useEffect(() => {
    let filtered = trades

    if (searchTerm) {
      filtered = filtered.filter(trade =>
        trade.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.strategy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.tags?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedInstrument) {
      filtered = filtered.filter(trade => trade.instrument === selectedInstrument)
    }

    if (selectedStrategy) {
      filtered = filtered.filter(trade => trade.strategy === selectedStrategy)
    }

    if (pnlFilter) {
      filtered = filtered.filter(trade => {
        if (!trade.pnl) return false
        switch (pnlFilter) {
          case "profit":
            return trade.pnl > 0
          case "loss":
            return trade.pnl < 0
          case "breakeven":
            return trade.pnl === 0
          default:
            return true
        }
      })
    }

    setFilteredTrades(filtered)
  }, [trades, searchTerm, selectedInstrument, selectedStrategy, pnlFilter])

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const exportToCSV = () => {
    const headers = [
      "Date", "Instrument", "Type", "Entry", "Exit", "P&L", "Strategy", "Tags"
    ]
    const csvContent = [
      headers.join(","),
      ...filteredTrades.map(trade => [
        formatDate(trade.tradeDate),
        trade.instrument,
        trade.tradeType,
        trade.entryPrice,
        trade.exitPrice || "",
        trade.pnl || "",
        trade.strategy || "",
        trade.tags || ""
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "trades.csv"
    a.click()
  }

  const totalPnL = filteredTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0)
  const winRate = filteredTrades.length > 0 
    ? (filteredTrades.filter(t => (t.pnl || 0) > 0).length / filteredTrades.length * 100).toFixed(1)
    : "0"

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Trade Journal</h1>
          <p className="text-gray-400">View and analyze your trading history</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
        >
          <Download className="h-5 w-5 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total P&L</p>
              <p className={cn(
                "text-2xl font-bold",
                totalPnL > 0 ? "text-green-500" : totalPnL < 0 ? "text-red-500" : "text-white"
              )}>
                {formatCurrency(totalPnL)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-2xl font-bold text-white">{winRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Trades</p>
              <p className="text-2xl font-bold text-white">{filteredTrades.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 mr-2 text-gray-400" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search trades..."
                className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Instrument
            </label>
            <select
              value={selectedInstrument}
              onChange={(e) => setSelectedInstrument(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Instruments</option>
              {instruments.map((instrument) => (
                <option key={instrument} value={instrument}>
                  {instrument}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Strategy
            </label>
            <select
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Strategies</option>
              {strategies.map((strategy) => (
                <option key={strategy} value={strategy}>
                  {strategy}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              P&L Filter
            </label>
            <select
              value={pnlFilter}
              onChange={(e) => setPnlFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Trades</option>
              <option value="profit">Profitable</option>
              <option value="loss">Loss Making</option>
              <option value="breakeven">Break Even</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trades Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Instrument
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Entry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Exit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  P&L
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Strategy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredTrades.map((trade) => (
                <>
                  <tr key={trade.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatDate(trade.tradeDate, "MMM dd, HH:mm")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{trade.instrument}</div>
                        {trade.strikePrice && (
                          <div className="text-sm text-gray-400">
                            {trade.strikePrice} {trade.optionType}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                        trade.tradeType === "Buy" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      )}>
                        {trade.tradeType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      ₹{trade.entryPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {trade.exitPrice ? `₹${trade.exitPrice}` : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {trade.pnl ? (
                        <span className={cn(
                          "text-sm font-medium",
                          trade.pnl > 0 ? "text-green-500" : "text-red-500"
                        )}>
                          {trade.pnl > 0 ? "+" : ""}{formatCurrency(trade.pnl)}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {trade.strategy || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => toggleRow(trade.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {expandedRows.has(trade.id) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Details */}
                  {expandedRows.has(trade.id) && (
                    <tr>
                      <td colSpan={8} className="px-6 py-4 bg-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {/* Trade Details */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-3">Trade Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Segment:</span>
                                <span className="text-white">{trade.segment}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Product Type:</span>
                                <span className="text-white">{trade.productType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Position Size:</span>
                                <span className="text-white">{trade.positionSize} lots</span>
                              </div>
                              {trade.expiryDate && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Expiry:</span>
                                  <span className="text-white">{formatDate(trade.expiryDate)}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Psychology */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-3">Psychology</h4>
                            <div className="space-y-2 text-sm">
                              {trade.moodBeforeTrade && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Mood:</span>
                                  <span className="text-white">{trade.moodBeforeTrade}</span>
                                </div>
                              )}
                              {trade.confidenceLevel && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Confidence:</span>
                                  <span className="text-white">{trade.confidenceLevel}/10</span>
                                </div>
                              )}
                              {trade.focusLevel && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Focus:</span>
                                  <span className="text-white">{trade.focusLevel}/10</span>
                                </div>
                              )}
                              {trade.disciplineScore && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Discipline:</span>
                                  <span className="text-white">{trade.disciplineScore}/10</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Analysis */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-3">Analysis</h4>
                            <div className="space-y-2 text-sm">
                              {trade.tags && (
                                <div>
                                  <span className="text-gray-400">Tags:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {trade.tags.split(", ").map((tag) => (
                                      <span key={tag} className="px-2 py-1 bg-gray-700 text-xs rounded-full text-white">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {trade.emotionsFelt && (
                                <div>
                                  <span className="text-gray-400">Emotions:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {trade.emotionsFelt.split(", ").map((emotion) => (
                                      <span key={emotion} className="px-2 py-1 bg-purple-600 text-xs rounded-full text-white">
                                        {emotion}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {trade.mistakesMade && (
                                <div>
                                  <span className="text-gray-400">Mistakes:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {trade.mistakesMade.split(", ").map((mistake) => (
                                      <span key={mistake} className="px-2 py-1 bg-red-600 text-xs rounded-full text-white">
                                        {mistake}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        {(trade.notes || trade.reflectionNotes) && (
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <h4 className="text-sm font-semibold text-white mb-2">Notes</h4>
                            <div className="space-y-2 text-sm text-gray-300">
                              {trade.notes && (
                                <div>
                                  <span className="text-gray-400">Trade Notes:</span>
                                  <p className="mt-1">{trade.notes}</p>
                                </div>
                              )}
                              {trade.reflectionNotes && (
                                <div>
                                  <span className="text-gray-400">Reflection:</span>
                                  <p className="mt-1">{trade.reflectionNotes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}