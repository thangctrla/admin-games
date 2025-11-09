import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { GameForm } from "@/components/game-form"

interface GameEditPageProps {
  params: Promise<{ id: string }>
}

export default async function GameEditPage({ params }: GameEditPageProps) {
  const { id } = await params
  const gameId = Number.parseInt(id, 10)

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GameForm gameId={gameId} />
      </main>
    </ProtectedRoute>
  )
}
