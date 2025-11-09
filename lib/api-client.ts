const API_BASE_URL = "https://tool.delimart.com.vn/api"

export interface Game {
  id: number
  title: string
  img: string
  link: string
}

export interface GameFormData {
  title: string
  img: string
  link: string
}

export const apiClient = {
  async getGames(): Promise<Game[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/games`)
      if (!response.ok) throw new Error("Failed to fetch games")
      return await response.json()
    } catch (error) {
      console.error("Error fetching games:", error)
      throw error
    }
  },

  async getGame(id: number): Promise<Game> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/games/${id}`)
      if (!response.ok) throw new Error("Failed to fetch game")
      return await response.json()
    } catch (error) {
      console.error("Error fetching game:", error)
      throw error
    }
  },

  async createGame(data: GameFormData): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to create game")
      return await response.json()
    } catch (error) {
      console.error("Error creating game:", error)
      throw error
    }
  },

  async updateGame(id: number, data: GameFormData): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update game")
      return await response.json()
    } catch (error) {
      console.error("Error updating game:", error)
      throw error
    }
  },

  async deleteGame(id: number): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/games/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete game")
      return await response.json()
    } catch (error) {
      console.error("Error deleting game:", error)
      throw error
    }
  },
}
