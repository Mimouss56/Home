import { IRole } from './Home/user';

export interface User extends IRole {
  id: number
  email: string
  first_name: string
  last_name: string
  username: string
  avatar_url: string
  created_at?: string
  updated_at?: string
  delete_at?: string
  last_visited?: string
  bio: string,
}
