"use client"

import { useRouter } from "next/navigation"
import { clearAuthToken } from "@/lib/auth"
import Link from "next/link"

export function Navbar() {
  const router = useRouter()

  const handleLogout = () => {
    clearAuthToken()
    router.push("/login")
  }

  return (
    <nav className="bg-card border-b border-border/50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">GM</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Games Manager</h1>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-all text-sm font-medium"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  )
}
