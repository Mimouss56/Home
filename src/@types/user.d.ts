export interface User {
  id: number
  email: string
  username: string
  role: Role
}

export interface Role {
  id: number
  label: string
  color?: string
}
