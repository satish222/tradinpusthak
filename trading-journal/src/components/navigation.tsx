"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/cn"
import { 
  BarChart3, 
  BookOpen, 
  Brain, 
  Home, 
  Plus, 
  Settings, 
  TrendingUp,
  LogOut
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Add Trade", href: "/add-trade", icon: Plus },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Psychology", href: "/psychology", icon: Brain },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="flex flex-col h-full bg-gray-900 border-r border-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <TrendingUp className="h-8 w-8 text-green-500" />
          <h1 className="ml-2 text-xl font-bold text-white">Trading Pusthak</h1>
        </div>
        <div className="mt-8 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-2xl transition-colors",
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
      
      {session?.user && (
        <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {session.user.image ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={session.user.image}
                  alt={session.user.name || "User"}
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {session.user.name?.[0] || session.user.email?.[0] || "U"}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {session.user.name || session.user.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="ml-auto p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      )}
    </nav>
  )
}