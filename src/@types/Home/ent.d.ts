export interface IEntreprise extends IArrayContact {
  id: number;
  name?: string;
  address?: string;
  postalCode?: string;
  town?: string;
  urlImg?: string;
}
export interface IEntObject {
  ent : IEntreprise;
}

export interface IContact extends IArrayInter {
  id: number;
  nom:string,
  prenom:string,
  email:string,
  role:string,
  phone:string,
  idEnt : number,
}
export interface IArrayContact {
  contact?: IContact[];
}

export interface IInteraction {
  id : number,
  moyen: string,
  reponse:string,
  status?: IStatus,
  createdAt: string,
}

export interface IArrayInter {
  interaction: IInteraction[];
}

export interface IInterVue {
  id: number;
  entreprise: string;
  contact: string;
  status?: IStatus;
  createdAt: string;
}

export interface IStatus {
  id: number;
  label: string;
}
