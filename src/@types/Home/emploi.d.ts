import { IEntreprise } from './ent.d';
import { IArraySkill } from './skill';

export interface IEmploi extends IDateEmploi, IArraySkill {
  id: number,
  title: string
  date: {
    debut: string,
    fin: string
  },
  description: string,
  ent: IEntreprise
  type: 'job' | 'school'
}

export interface IDateEmploi {
  date?: {
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
