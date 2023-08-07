export interface User {
  id: number
  email: string
<<<<<<< HEAD
  username: string
  role: Role
=======
  first_name: string
  last_name: string
  username: string
  avatar_url: string
  github: IGithubUser
  created_at?: string
  updated_at?: string
  delete_at?: string
  last_visited?: string
  role: Role
  bio: string,
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
}

export interface Role {
  id: number
  label: string
  color?: string
}
