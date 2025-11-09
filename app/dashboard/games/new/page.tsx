import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { GameForm } from "@/components/game-form"

export default function NewGamePage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GameForm />
      </main>
    </ProtectedRoute>
  )
}
