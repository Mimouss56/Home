import { IEntObject } from './ent.d';
import { IArraySoftSkill } from './softSkill';

export interface IEmploi extends IDateEmploi, IArraySoftSkill, IEntObject {
  id: number,
  title: string
  description: string,
  type: 'job' | 'school'
}

export interface IDateEmploi {
  date: {
    debut: string,
    fin: string
  }
}

export interface IEmploiPost extends IArraySoftSkill {
  type: 'job' | 'school'
  id: number,
  ent: {
    id: number,
    name: string,
  },
  title: string,
  date: {
    debut: string,
    fin: string,
  }
  description: string,
}

export interface ICVDetails {
  id: number,
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
}
