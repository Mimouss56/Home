export interface ISanction {
  id: number;
  label: string;
  author: {
    id: number;
    username: string;
    email: string;
  }
  date: {
    year: number;
    week: number;
    complete: string;
  }

}
export interface ISanctionResult {
  code : number;
  message : string;
  sanction : ISanction;
}
