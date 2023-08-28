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
