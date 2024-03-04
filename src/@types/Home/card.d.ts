import { IDateEmploi } from './emploi';
import { IAuthor } from './user';

export interface ICard extends IDateEmploi {
  id: number;
  title: string | undefined;
  desc: string;
  urlSite? : string | undefined;
  urlImg: string;
  alt: string;
  competences ?: string[] | undefined;
  target: string;
  type: string
}

export interface ICardNews extends IAuthor {
  id: number;
  title: string;
  content: string;
}
