import { IAuthor } from './user';

export interface ICreateNews extends IAuthor, ITag {
  id: number;
  title: string;
  content: string;
  draft: boolean;
}
export interface INews extends IAuthor, ITag, ICreateNews {
  created_at: string;
  updated_at: string;
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
