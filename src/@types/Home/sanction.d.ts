export interface ISanction {
  id: number;
  label: string;
  author: {
    id: number;
    username: string;
    email: string;
  }
  date: ISanctionDate
  child :
  {
    id: number;
    username: string;
  }
  warn : boolean;
}
export interface ICreateSanction {
  id?: number | null;
  label: string;
  author?: ISanctionAuthor | null;
  child? :
  {
    id: number;
    username: string;
  } | null;
  warn : boolean | null;
  date?: ISanctionDate | null;
}
export interface ISanctionResult {
  code : number;
  message : string;
  sanction : ISanction;
}

export interface ISanctionAuthor {
  id: number;
  username: string;
  email: string;

}

export interface ISanctionDate {
  year: number;
  week: number;
  complete: string;
}
