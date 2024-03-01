export interface ISanction extends ISanctionDate, ISanctionAuthor, IChild {
  id: number;
  label: string;
  warn : boolean;
  read: boolean;
}

export interface ISanctionAuthor {
  author?: {
    id: number;
    username: string;
    email: string;
  }
}

export interface ISanctionDate {
  date?: {
    year: number;
    week: number;
    complete: string;
  }
}

export interface IChild {
  child?: {
    id: number;
    username: string;
  }
}
