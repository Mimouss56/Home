import { IAuthor } from './user';

export interface ICreateNews extends IAuthor {
  id: number;
  title: string;
  content: string;
  draft: boolean;
  created_at: string;
  updated_at: string;
}
export interface INews {
  id: number;
  title: string;
  content: string;
  draft: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ITag {
  tags?: [
    {
      id: number;
      label: string;
      color: string;
    },
  ]
}
