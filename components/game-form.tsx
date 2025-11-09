"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiClient, type GameFormData } from "@/lib/api-client"

interface GameFormProps {
  gameId?: number
}

export function GameForm({ gameId }: GameFormProps) {
  const [formData, setFormData] = useState<GameFormData>({
    title: "",
    img: "",
    link: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(gameId ? true : false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (gameId) {
      const fetchGame = async () => {
        try {
          const game = await apiClient.getGame(gameId)
          setFormData({
            title: game.title,
            img: game.img,
            link: game.link,
          })
        } catch (err) {
          setError("Không thể tải thông tin game")
        } finally {
          setIsFetching(false)
        }
      }

      fetchGame()
    }
  }, [gameId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (gameId) {
        await apiClient.updateGame(gameId, formData)
        alert("Cập nhật game thành công!")
      } else {
        await apiClient.createGame(formData)
        alert("Tạo game thành công!")
      }
      router.push("/dashboard")
    } catch (err) {
      setError(gameId ? "Cập nhật thất bại" : "Tạo game thất bại")
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border border-border/50 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-foreground">{gameId ? "Sửa Game" : "Tạo Game Mới"}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Tên Game</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-border rounded-md bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Nhập tên game"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">URL Hình ảnh</label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-border rounded-md bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="https://example.com/image.jpg"
              disabled={isLoading}
            />
            {formData.img && (
              <div className="mt-3 rounded-md overflow-hidden border border-border/50">
                <img
                  src={'https://geodashlite.org/' + formData.img || "/placeholder.svg"}
                  alt="Preview"
                  className="w[300px] h[300px] object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Link Game</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-border rounded-md bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="https://example.com/game"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground rounded-md font-semibold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isLoading ? "Đang xử lý..." : gameId ? "Cập nhật" : "Tạo"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 bg-muted text-muted-foreground rounded-md font-semibold hover:bg-muted/80 transition-all disabled:opacity-50"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
