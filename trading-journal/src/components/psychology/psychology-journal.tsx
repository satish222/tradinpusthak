"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { 
  Brain, 
  Calendar, 
  Save, 
  Plus, 
  BookOpen,
  TrendingUp,
  TrendingDown,
  Target,
  Clock
} from "lucide-react"
import { cn } from "@/utils/cn"

const psychologySchema = z.object({
  entryDate: z.string(),
  entryType: z.enum(["daily", "weekly"]),
  overallMindset: z.string().min(1, "Mindset reflection is required"),
  topEmotions: z.string().optional(),
  emotionsImpact: z.string().optional(),
  weeklyDisciplineRating: z.number().min(1).max(10).optional(),
  weeklyImprovementPlan: z.string().optional(),
  notes: z.string().optional(),
})

type PsychologyFormData = z.infer<typeof psychologySchema>

const emotions = ["Fear", "Greed", "Confidence", "Regret", "Excitement", "Anxiety", "Calm", "Frustration", "Hope", "Doubt"]
const mindsetPrompts = [
  "How am I feeling about my trading today?",
  "What emotions am I experiencing?",
  "How are my emotions affecting my decisions?",
  "What patterns am I noticing in my behavior?",
  "What can I learn from today's trading?",
  "How can I improve my mindset?",
]

interface PsychologyEntry {
  id: string
  entryDate: string
  entryType: string
  overallMindset: string
  topEmotions?: string
  emotionsImpact?: string
  weeklyDisciplineRating?: number
  weeklyImprovementPlan?: string
  notes?: string
}

const mockEntries: PsychologyEntry[] = [
  {
    id: "1",
    entryDate: "2024-01-15",
    entryType: "daily",
    overallMindset: "Feeling confident today. Market conditions are favorable and I'm sticking to my plan. No FOMO, no revenge trading.",
    topEmotions: "Confidence, Calm, Focus",
    emotionsImpact: "Positive emotions helped me make rational decisions and stick to my stop losses.",
    notes: "Good day overall. Need to maintain this discipline."
  },
  {
    id: "2",
    entryDate: "2024-01-14",
    entryType: "daily",
    overallMindset: "Slightly anxious about the market volatility. Need to stay focused and not let emotions drive decisions.",
    topEmotions: "Anxiety, Caution, Focus",
    emotionsImpact: "Anxiety made me more conservative, which was actually good. Took smaller positions.",
    notes: "Volatility is high, need to be extra careful with position sizing."
  },
  {
    id: "3",
    entryDate: "2024-01-13",
    entryType: "weekly",
    overallMindset: "Weekly reflection: Overall discipline was good but had one instance of revenge trading. Need to work on emotional control.",
    topEmotions: "Regret, Learning, Determination",
    emotionsImpact: "The revenge trade taught me a valuable lesson about emotional control.",
    weeklyDisciplineRating: 7,
    weeklyImprovementPlan: "1. No revenge trading 2. Stick to position sizing rules 3. Take breaks when feeling emotional",
    notes: "Week was profitable but could have been better without the revenge trade."
  }
]

export function PsychologyJournal() {
  const [entries, setEntries] = useState<PsychologyEntry[]>(mockEntries)
  const [showForm, setShowForm] = useState(false)
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PsychologyFormData>({
    resolver: zodResolver(psychologySchema),
    defaultValues: {
      entryType: "daily",
      entryDate: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (data: PsychologyFormData) => {
    try {
      const newEntry: PsychologyEntry = {
        id: Date.now().toString(),
        ...data,
        topEmotions: selectedEmotions.join(", "),
      }
      
      setEntries(prev => [newEntry, ...prev])
      setSelectedEmotions([])
      reset()
      setShowForm(false)
      
    } catch (error) {
      console.error("Error submitting psychology entry:", error)
    }
  }

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    )
  }

  const getMoodColor = (mindset: string) => {
    const positiveWords = ["confident", "calm", "focused", "positive", "good", "excited"]
    const negativeWords = ["anxious", "fear", "regret", "frustrated", "nervous", "worried"]
    
    const lowerMindset = mindset.toLowerCase()
    if (positiveWords.some(word => lowerMindset.includes(word))) return "text-green-500"
    if (negativeWords.some(word => lowerMindset.includes(word))) return "text-red-500"
    return "text-yellow-500"
  }

  const averageDisciplineRating = entries
    .filter(entry => entry.weeklyDisciplineRating)
    .reduce((sum, entry) => sum + (entry.weeklyDisciplineRating || 0), 0) / 
    entries.filter(entry => entry.weeklyDisciplineRating).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Psychology Journal</h1>
          <p className="text-gray-400">Track your trading mindset and emotional patterns</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Entry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Entries</p>
              <p className="text-2xl font-bold text-white">{entries.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Discipline</p>
              <p className="text-2xl font-bold text-white">
                {averageDisciplineRating ? averageDisciplineRating.toFixed(1) : "N/A"}/10
              </p>
            </div>
            <Target className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Streak</p>
              <p className="text-2xl font-bold text-white">5 days</p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-500" />
            New Psychology Entry
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Entry Date
                </label>
                <input
                  type="date"
                  {...register("entryDate")}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Entry Type
                </label>
                <select
                  {...register("entryType")}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Overall Mindset Reflection
              </label>
              <textarea
                {...register("overallMindset")}
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="How are you feeling about your trading today? What's your overall mindset?"
              />
              {errors.overallMindset && (
                <p className="text-red-500 text-sm mt-1">{errors.overallMindset.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Top Emotions Felt
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                How Emotions Impacted Trading
              </label>
              <textarea
                {...register("emotionsImpact")}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="How did your emotions affect your trading decisions today?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Weekly Discipline Rating (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  {...register("weeklyDisciplineRating", { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="7"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Weekly Improvement Plan
                </label>
                <textarea
                  {...register("weeklyImprovementPlan")}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="What will you focus on improving next week?"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                {...register("notes")}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Any additional thoughts or observations..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center disabled:opacity-50"
              >
                <Save className="h-5 w-5 mr-2" />
                {isSubmitting ? "Saving..." : "Save Entry"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mindset Prompts */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-500" />
          Mindset Reflection Prompts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mindsetPrompts.map((prompt, index) => (
            <div key={index} className="p-3 bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-300">{prompt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Recent Entries</h3>
        {entries.map((entry) => (
          <div key={entry.id} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {new Date(entry.entryDate).toLocaleDateString()}
                  </span>
                </div>
                <span className={cn(
                  "px-2 py-1 text-xs font-semibold rounded-full",
                  entry.entryType === "daily" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-purple-100 text-purple-800"
                )}>
                  {entry.entryType}
                </span>
              </div>
              {entry.weeklyDisciplineRating && (
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-white">
                    Discipline: {entry.weeklyDisciplineRating}/10
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Mindset</h4>
                <p className={cn("text-white", getMoodColor(entry.overallMindset))}>
                  {entry.overallMindset}
                </p>
              </div>

              {entry.topEmotions && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Top Emotions</h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.topEmotions.split(", ").map((emotion) => (
                      <span key={emotion} className="px-2 py-1 bg-purple-600 text-xs rounded-full text-white">
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.emotionsImpact && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Emotional Impact</h4>
                  <p className="text-gray-300 text-sm">{entry.emotionsImpact}</p>
                </div>
              )}

              {entry.weeklyImprovementPlan && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Improvement Plan</h4>
                  <p className="text-gray-300 text-sm">{entry.weeklyImprovementPlan}</p>
                </div>
              )}

              {entry.notes && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Notes</h4>
                  <p className="text-gray-300 text-sm">{entry.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}