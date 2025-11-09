"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { isValidLogin, setAuthToken } from "@/lib/auth"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (isValidLogin(username, password)) {
      setAuthToken("authenticated")
      router.push("/dashboard")
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không chính xác")
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-card rounded-lg shadow-2xl p-8 border border-border/50">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-3 text-foreground">Games Manager</h1>
          <p className="text-center text-muted-foreground text-sm">Đăng nhập để quản lý games của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-md bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Nhập tên đăng nhập"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-md bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Nhập mật khẩu"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-all disabled:opacity-50 mt-6"
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-muted/50 rounded-md border border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            <strong className="text-foreground">Demo Credentials:</strong>
            <br />
            Tên: admin
            <br />
            Mật khẩu: password123
          </p>
        </div>
      </div>
    </div>
  )
}
