export interface IOption {
  id: number;
  value: string;
  name: string;
  active: boolean;

}

export interface ICreateOption {
  id?: number | null;
  value?: string;
  name: string;
  active: boolean;
}
