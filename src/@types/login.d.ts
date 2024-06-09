import { IRole, IUser } from './Home/user';

export interface LoginResponse {
  sessionToken: string
  message: string
  user: IUser
}
