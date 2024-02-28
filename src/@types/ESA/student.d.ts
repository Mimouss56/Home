export interface IcreateParent {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  zipcode: number;
  town: string;
  child?: array<IStudent.id>
}
export interface IParent extends IcreateParent {
  id: number;
}
export interface IStudent {
  id: number;
  first_name: string;
  last_name: string;
  classe: string;
  parents?: array<IParent>
}

export interface ICantineStudent extends IStudent {
  present: boolean;
}
