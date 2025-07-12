"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { 
  Calendar, 
  DollarSign, 
  Target, 
  AlertTriangle,
  Brain,
  Upload,
  Save,
  X
} from "lucide-react"
import { cn } from "@/utils/cn"

const tradeSchema = z.object({
  tradeDate: z.string(),
  segment: z.enum(["Futures", "Options"]),
  instrument: z.string().min(1, "Instrument is required"),
  tradeType: z.enum(["Buy", "Sell"]),
  strikePrice: z.number().optional(),
  optionType: z.enum(["CE", "PE"]).optional(),
  expiryDate: z.string().optional(),
  productType: z.enum(["MIS", "NRML"]),
  entryPrice: z.number().positive("Entry price must be positive"),
  exitPrice: z.number().optional(),
  positionSize: z.number().positive("Position size must be positive"),
  stopLoss: z.number().optional(),
  target: z.number().optional(),
  strategy: z.string().optional(),
  tags: z.string().optional(),
  notes: z.string().optional(),
  
  // Psychology fields
  moodBeforeTrade: z.string().optional(),
  confidenceLevel: z.number().min(1).max(10).optional(),
  focusLevel: z.number().min(1).max(10).optional(),
  emotionsFelt: z.string().optional(),
  mistakesMade: z.string().optional(),
  followedRules: z.boolean().optional(),
  disciplineScore: z.number().min(1).max(10).optional(),
  reflectionNotes: z.string().optional(),
})

type TradeFormData = z.infer<typeof tradeSchema>

const instruments = ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY", "SENSEX", "BANKEX"]
const strategies = ["Breakout", "Breakdown", "Support/Resistance", "Trend Following", "Mean Reversion", "Expiry Trade", "News Based", "Technical Analysis"]
const emotions = ["Fear", "Greed", "Confidence", "Regret", "Excitement", "Anxiety", "Calm", "Frustration"]
const mistakes = ["Revenge Trading", "Early Entry", "Late Exit", "No Stop Loss", "Over Trading", "Emotional Decision", "Not Following Plan"]

export function AddTradeForm() {
  const [showPsychology, setShowPsychology] = useState(false)
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [selectedMistakes, setSelectedMistakes] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      segment: "Options",
      productType: "MIS",
      tradeType: "Buy",
    },
  })

  const segment = watch("segment")
  const entryPrice = watch("entryPrice")
  const exitPrice = watch("exitPrice")
  const positionSize = watch("positionSize")

  const calculatePnL = () => {
    if (!entryPrice || !exitPrice || !positionSize) return 0
    const priceDiff = exitPrice - entryPrice
    const multiplier = watch("tradeType") === "Buy" ? 1 : -1
    return priceDiff * positionSize * 50 * multiplier // Assuming 50 is lot size
  }

  const pnl = calculatePnL()

  const onSubmit = async (data: TradeFormData) => {
    try {
      // Add selected emotions and mistakes to form data
      const formData = {
        ...data,
        emotionsFelt: selectedEmotions.join(", "),
        mistakesMade: selectedMistakes.join(", "),
        pnl: pnl,
      }
      
      console.log("Trade data:", formData)
      // TODO: Submit to API
      
    } catch (error) {
      console.error("Error submitting trade:", error)
    }
  }

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    )
  }

  const toggleMistake = (mistake: string) => {
    setSelectedMistakes(prev => 
      prev.includes(mistake) 
        ? prev.filter(m => m !== mistake)
        : [...prev, mistake]
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Add New Trade</h1>
        <p className="text-gray-400">Record your F&O trade with psychology insights</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Trade Information */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
            Trade Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Trade Date & Time
              </label>
              <input
                type="datetime-local"
                {...register("tradeDate")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.tradeDate && (
                <p className="text-red-500 text-sm mt-1">{errors.tradeDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Segment
              </label>
              <select
                {...register("segment")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Futures">Futures</option>
                <option value="Options">Options</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Instrument
              </label>
              <select
                {...register("instrument")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Instrument</option>
                {instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument}
                  </option>
                ))}
              </select>
              {errors.instrument && (
                <p className="text-red-500 text-sm mt-1">{errors.instrument.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Trade Type
              </label>
              <select
                {...register("tradeType")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </div>

            {segment === "Options" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Strike Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("strikePrice", { valueAsNumber: true })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 19500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Option Type
                  </label>
                  <select
                    {...register("optionType")}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Type</option>
                    <option value="CE">Call (CE)</option>
                    <option value="PE">Put (PE)</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                {...register("expiryDate")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Product Type
              </label>
              <select
                {...register("productType")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="MIS">MIS</option>
                <option value="NRML">NRML</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price and Position Information */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-500" />
            Price & Position
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Entry Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("entryPrice", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
              {errors.entryPrice && (
                <p className="text-red-500 text-sm mt-1">{errors.entryPrice.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Exit Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("exitPrice", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Position Size (Lots)
              </label>
              <input
                type="number"
                {...register("positionSize", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="1"
              />
              {errors.positionSize && (
                <p className="text-red-500 text-sm mt-1">{errors.positionSize.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                P&L (Auto-calculated)
              </label>
              <div className={cn(
                "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white",
                pnl > 0 ? "text-green-500" : pnl < 0 ? "text-red-500" : "text-gray-400"
              )}>
                ₹{pnl.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stop Loss
              </label>
              <input
                type="number"
                step="0.01"
                {...register("stopLoss", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target
              </label>
              <input
                type="number"
                step="0.01"
                {...register("target", { valueAsNumber: true })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Strategy and Tags */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">Strategy & Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Strategy Used
              </label>
              <select
                {...register("strategy")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Strategy</option>
                {strategies.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                {...register("tags")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., breakout, expiry trade"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Additional notes about the trade..."
            />
          </div>
        </div>

        {/* Psychology Section Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowPsychology(!showPsychology)}
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
          >
            <Brain className="h-5 w-5 mr-2" />
            {showPsychology ? "Hide" : "Add"} Psychology Analysis
          </button>
        </div>

        {/* Psychology Section */}
        {showPsychology && (
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-500" />
              Trading Psychology
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mood Before Trade
                </label>
                <input
                  type="text"
                  {...register("moodBeforeTrade")}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 😊 Confident, 😰 Nervous"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confidence Level (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  {...register("confidenceLevel", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="7"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Focus Level (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  {...register("focusLevel", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="8"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Emotions Felt
              </label>
              <div className="flex flex-wrap gap-2">
                {emotions.map((emotion) => (
                  <button
                    key={emotion}
                    type="button"
                    onClick={() => toggleEmotion(emotion)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-colors",
                      selectedEmotions.includes(emotion)
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    )}
                  >
                    {emotion}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mistakes Made
              </label>
              <div className="flex flex-wrap gap-2">
                {mistakes.map((mistake) => (
                  <button
                    key={mistake}
                    type="button"
                    onClick={() => toggleMistake(mistake)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-colors",
                      selectedMistakes.includes(mistake)
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    )}
                  >
                    {mistake}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Did you follow your rules?
                </label>
                <select
                  {...register("followedRules")}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Discipline Score (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  {...register("disciplineScore", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="7"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Reflection Notes
              </label>
              <textarea
                {...register("reflectionNotes")}
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="What did you learn from this trade? How can you improve?"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors flex items-center"
          >
            <X className="h-5 w-5 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors flex items-center disabled:opacity-50"
          >
            <Save className="h-5 w-5 mr-2" />
            {isSubmitting ? "Saving..." : "Save Trade"}
          </button>
        </div>
      </form>
    </div>
  )
}