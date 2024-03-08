import { IEntreprise } from './ent.d';

export interface IEmploi extends IDateEmploi {
  id: number,
  title: string
  date: {
    debut: string,
    fin: string
  },
  description: string,
  competences?: string[],
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
  type: 'job',
  id: 0,
  id_ent: 0,
  title: '',
  debut: '',
  fin: '',
  description: '',
}
