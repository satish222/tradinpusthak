"use client"

import { useSession } from "next-auth/react"
import { Navigation } from "@/components/navigation"
import { LoginPage } from "@/components/auth/login-page"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!session) {
    return <LoginPage />
  }

  return (
    <div className="flex h-screen bg-gray-950">
      <div className="w-64 flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  )
}