export interface ISkill {
  id: number;
  name: string;
}

export interface ICreateSkill {
  name: string;
}
export interface IArraySkill {
  competences: ISkill[];
}
