import { IDateEmploi } from './emploi';
import { IArraySoftSkill } from './softSkill';
import { IAuthor } from './user';

export interface ICard extends IDateEmploi, IArraySoftSkill {
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
