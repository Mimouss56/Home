export interface ISanction extends ISanctionAuthor, IChild {
  id: number;
  label: string;
  warn : boolean;
  read: boolean;
  created_at: string
}

export interface ISanctionAuthor {
  author?: {
    id: number;
    username: string;
    email: string;
  }
}

export interface IChild {
  child?: {
    id: number;
    username: string;
  }
}
