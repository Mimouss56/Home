import { User } from './user';

export interface LoginResponse {
  id: number
  logged: boolean
  token: string
  data : User
  role: Role
}
