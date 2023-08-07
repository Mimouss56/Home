<<<<<<< HEAD
import { Role } from './user';

export interface LoginResponse {
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
=======
import { User } from './user';

export interface LoginResponse {
  id: number
  logged: boolean
  token: string
  data : User
  role: Role
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
}
