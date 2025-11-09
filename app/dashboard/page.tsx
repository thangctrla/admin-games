import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { GamesList } from "@/components/games-list"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GamesList />
      </main>
    </ProtectedRoute>
  )
}
