import { Author } from './user';

export interface INews {
  id: number;
  title: string;
  content: string;
  author: Author;
  created_at: string;
  updated_at: string;
  tags: ITag[];

}

export interface ITag {
  id: number;
  label: string;
  color: string;
}

export interface ICreateNews {
  id?: number | null;
  title: string;
  content: string;
  author?: Author | null;
  tags?: ITag[] | undefined;
}
