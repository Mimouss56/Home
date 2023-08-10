interface IEmploi {
  ent: string
  title: string
  date: {
    debut: string,
    fin: string
  },
  lieu: {
    ville: string,
    departement: string
  },
  description: string,
  competences: string[]
}

export interface Job {
  id: number,
  ent: string,
  title: string,
  date: {
    debut: string,
    fin: string,
  },
  lieu: {
    ville: string,
    departement: number,
  },
  description: string,
  competences : string[],
  url_img: string
}
