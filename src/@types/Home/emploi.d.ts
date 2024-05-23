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

export interface IEmploiPost {
  type: string,
  id: number,
  id_ent: number,
  title: string,
  debut: string,
  fin: string,
  description: string,
  competences: number[]
}

export interface ICVDetails {
  id: number,
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
}
