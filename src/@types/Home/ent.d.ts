export interface IEntreprise {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  town: string;
  urlImg: string;
  contact: IContact[];
}
export interface IContact {
  id: number;
  nom:string,
  prenom:string,
  email:string,
  role:string,
  phone:string,
  idEnt : number,
  interaction: Interaction[];
}

export interface IInteraction {
  id : number,
  moyen: string,
  reponse:string,
  status: string,
  created_at: string,
}
