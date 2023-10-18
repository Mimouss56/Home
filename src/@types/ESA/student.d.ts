export interface IStudent {
  id: number;
  first_name: string;
  last_name: string;
  class: string;
  parents: array<IParent>
}

export interface IParent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  street: string;
  zipcode: number;
  town: string;
}

export interface IcreateStudent {
  id: number;
  first_name: string;
  last_name: string;
  class: string;
  parents?: array<IcreateParent>
}

export interface IcreateParent {
  first_name: string;
  last_name: string;
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
