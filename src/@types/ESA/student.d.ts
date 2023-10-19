export interface IStudent {
  id: number;
  first_name: string;
  last_name: string;
  class: string;
  parents?: array<IParent>
}

export interface IParent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  zipcode: number;
  town: string;
  child : array<IStudent.id>
}

export interface IcreateStudent {
  id: number;
  first_name: string;
  last_name: string;
  class: string;
  parents?: array<IcreateParent>
}

export interface IcreateParent {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  zipcode: number;
  town: string;
  children?: array<IStudent.id>
}

export interface ICantineStudent {
  id: number;
  first_name: string;
  last_name: string;
  class: string;
  present: boolean;
}
