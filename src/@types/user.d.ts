export interface User {
  id: number
  email: string
  username: string
  role: Role
  job: Job[]
  school: Job
}

export interface Role {
  id: number
  label: string
  color?: string
}
