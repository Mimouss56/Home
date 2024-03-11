import { IDateEmploi } from './emploi';
import { IArraySkill } from './skill';
import { IAuthor } from './user';

export interface ICard extends IDateEmploi, IArraySkill {
  id: number;
  title: string | undefined;
  desc: string;
  urlSite? : string | undefined;
  urlImg: string;
  alt: string;
  target: string;
  type: string
}

export interface ICardNews extends IAuthor {
  id: number;
  title: string;
  content: string;
}
