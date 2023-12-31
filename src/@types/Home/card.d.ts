import { Author } from './user';

export interface ICard {
  id: number;
  title?: string | undefined;
  desc: string;
  urlSite? : string | undefined;
  urlImg: string;
  alt: string;
  date ?: {
    debut : string;
    fin : string;
  } | undefined;
  competences ?: string[] | undefined;
  target: string;
}

export interface ICardNews {
  id: number;
  title: string;
  content: string;
  author : Author
}
