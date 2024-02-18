export interface IEmploi {
  ent: string
  title: string
  date: {
    debut: string,
    fin: string
  },
  description: string,
  competences: string[],
  ent: IEntreprise
}

export interface Job {
  id: number,
  title: string,
  date: {
    debut: string,
    fin: string,
  },
  description: string,
  competences? : string[],
  ent: IEntreprise
}
