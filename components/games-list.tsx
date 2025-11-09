"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiClient, type Game } from "@/lib/api-client"
import Link from "next/link"

export function GamesList() {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true)
        const data = await apiClient.getGames()
        setGames(data)
      } catch (err) {
        setError("Không thể tải danh sách games. Vui lòng kiểm tra kết nối server.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGames()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa game này?")) return

    try {
      await apiClient.deleteGame(id)
      setGames(games.filter((g) => g.id !== id))
    } catch (err) {
      alert("Xóa game thất bại")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải games...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Danh sách Games</h2>
          <p className="text-muted-foreground text-sm mt-1">Quản lý các game của bạn</p>
        </div>
        <Link
          href="/dashboard/games/new"
          className="px-4 py-2.5 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-all font-medium"
        >
          + Thêm Game
        </Link>
      </div>

      {games.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-lg border border-border/50">
          <p className="text-muted-foreground mb-4">Chưa có game nào</p>
          <Link
            href="/dashboard/games/new"
            className="inline-block px-4 py-2.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 font-medium"
          >
            Tạo game đầu tiên
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:border-border transition-all duration-300 group"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={'https://geodashlite.org/' + game.img || "/placeholder.svg"}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">{game.title}</h3>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/games/${game.id}`}
                    className="flex-1 text-center px-3 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-all text-sm font-medium"
                  >
                    Sửa
                  </Link>
                  <a
                    href={game.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-all text-sm font-medium"
                  >
                    Truy cập
                  </a>
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="flex-1 px-3 py-2 bg-destructive/80 text-destructive-foreground rounded-md hover:bg-destructive transition-all text-sm font-medium"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
