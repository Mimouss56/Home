import { IEmploi } from './emploi';

export interface IUser extends IRole, IAvatar {
  id: number
  email: string
  username: string
  family: boolean
  child: boolean
  sanction?: Sanction[]
  cv: {
    job: IEmploi[]
    school: IEmploi[]
  }
  last_visited: string
}

export interface IRole {
  role: {
    id: number
    label: string
    color?: string
  }
}
export interface IRoleWithoutObject {
  id: number
  label: string
  color?: string
}
export interface IAvatar {
  avatar: {
    id: number
    name: string
    path: string
  }
}

export interface IAvatarWithoutObject {
  id: number
  name: string
  path: string
}

export interface IAuthor extends IRole {
  author?: {
    id: number
    username: string
    email: string
    created_at: string
    updated_at: string
    last_visited: string
  }
}
