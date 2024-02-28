import { IRole } from './Home/user';

export interface LoginResponse extends IRole {
  token: string;
  id: number
  username: string
  email: string
  sessionToken: string
  message: string
}
