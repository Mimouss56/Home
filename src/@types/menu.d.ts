export interface MenuProp {
  id: number;
  name: string;
  link: string;
}

export interface MenuItemsProp extends MenuProp {
  icon : string;
  component : string;
}
