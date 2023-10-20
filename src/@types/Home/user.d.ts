export interface User {
  id: number
  email: string
  username: string
  role: Role
  family: boolean
  child: boolean
  sanction?: Sanction[]
  job?: Job[]
  school?: Job[]
  last_visited: string
}

export interface Role {
  id: number
  label: string
  color?: string
}

export interface Author {
  id: number
  username: string
  email: string
  created_at: string
  updated_at: string
  last_visited: string
  child: boolean
  role: Role
}
