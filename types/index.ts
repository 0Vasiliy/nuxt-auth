export interface User {
  name: string
  surname: string
  credentials: {
    username: string
    passphrase: string
  }
  active: boolean
  created: string
  _comment?: string
}

export interface AuthState {
  isAuthenticated: boolean
  currentUser: User | null
  error: string | null
} 