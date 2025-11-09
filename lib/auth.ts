export const VALID_CREDENTIALS = {
  username: "admin",
  password: "ndgbj823n4g",
}

export const isValidLogin = (username: string, password: string): boolean => {
  return username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password
}

export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token)
  }
}

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
  }
}

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null
}
