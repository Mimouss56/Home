import { Role } from './Home/user';

export interface LoginResponse {
  token: string;
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
