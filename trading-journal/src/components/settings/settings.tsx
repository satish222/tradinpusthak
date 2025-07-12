"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Download, 
  Upload,
  Save,
  Trash2,
  User,
  Clock,
  Globe,
  Palette
} from "lucide-react"
import { cn } from "@/utils/cn"

const settingsSchema = z.object({
  defaultInstrument: z.string().optional(),
  defaultProductType: z.enum(["MIS", "NRML"]).optional(),
  defaultStrategies: z.string().optional(),
  timeFormat: z.enum(["12h", "24h"]),
  timezone: z.string(),
  theme: z.enum(["dark", "light"]),
})

type SettingsFormData = z.infer<typeof settingsSchema>

const instruments = ["NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY", "SENSEX", "BANKEX"]
const strategies = ["Breakout", "Breakdown", "Support/Resistance", "Trend Following", "Mean Reversion", "Expiry Trade", "News Based", "Technical Analysis"]
const timezones = [
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "America/New_York", label: "New York (EST)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
]

export function Settings() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      timeFormat: "12h",
      timezone: "Asia/Kolkata",
      theme: "dark",
    },
  })

  const onSubmit = async (data: SettingsFormData) => {
    try {
      const formData = {
        ...data,
        defaultStrategies: selectedStrategies.join(", "),
      }
      
      console.log("Settings data:", formData)
      // TODO: Save settings to API
      
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }

  const toggleStrategy = (strategy: string) => {
    setSelectedStrategies(prev => 
      prev.includes(strategy) 
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    )
  }

  const exportData = () => {
    const data = {
      trades: [],
      psychology: [],
      settings: {},
      exportDate: new Date().toISOString(),
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `trading-journal-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const importData = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            console.log("Imported data:", data)
            // TODO: Process imported data
          } catch (error) {
            console.error("Error parsing imported file:", error)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      // TODO: Clear all data
      console.log("Clearing all data...")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Customize your trading journal experience</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Trading Preferences */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-500" />
            Trading Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Instrument
              </label>
              <select
                {...register("defaultInstrument")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Default</option>
                {instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Default Product Type
              </label>
              <select
                {...register("defaultProductType")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Default</option>
                <option value="MIS">MIS</option>
                <option value="NRML">NRML</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Default Strategies
            </label>
            <div className="flex flex-wrap gap-2">
              {strategies.map((strategy) => (
                <button
                  key={strategy}
                  type="button"
                  onClick={() => toggleStrategy(strategy)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    selectedStrategies.includes(strategy)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  )}
                >
                  {strategy}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Palette className="h-5 w-5 mr-2 text-purple-500" />
            Display Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time Format
              </label>
              <select
                {...register("timeFormat")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="12h">12-hour (AM/PM)</option>
                <option value="24h">24-hour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Timezone
              </label>
              <select
                {...register("timezone")}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex items-center px-4 py-2 rounded-xl transition-colors",
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                )}
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </button>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={cn(
                  "flex items-center px-4 py-2 rounded-xl transition-colors",
                  theme === "light"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                )}
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <SettingsIcon className="h-5 w-5 mr-2 text-green-500" />
            Data Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={exportData}
              className="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Data
            </button>
            
            <button
              type="button"
              onClick={importData}
              className="flex items-center justify-center px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
            >
              <Upload className="h-5 w-5 mr-2" />
              Import Data
            </button>
            
            <button
              type="button"
              onClick={clearAllData}
              className="flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Clear All Data
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-gray-800 rounded-xl">
            <h4 className="text-sm font-semibold text-white mb-2">Data Export Includes:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• All trade entries with psychology data</li>
              <li>• Psychology journal entries</li>
              <li>• User settings and preferences</li>
              <li>• Analytics and performance data</li>
            </ul>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">Account Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value="user@example.com"
                disabled
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Member Since
              </label>
              <input
                type="text"
                value="January 2024"
                disabled
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors flex items-center disabled:opacity-50"
          >
            <Save className="h-5 w-5 mr-2" />
            {isSubmitting ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  )
}