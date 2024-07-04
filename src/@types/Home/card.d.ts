import { IDateEmploi } from './emploi';
import { IArraySoftSkill } from './softSkill';

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

export interface ICardNews {
  id: number;
  title: string;
  content: string;
}
