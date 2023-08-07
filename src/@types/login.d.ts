import { Role } from './user';

export interface LoginResponse {
  token: any;
  id: number
  username: string
  email: string
  sessionToken: string
  role: Role
  message: string
}

export interface LoginPost {
  email: string
  password: string
}
