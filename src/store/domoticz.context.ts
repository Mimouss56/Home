import { createContext } from 'react';

export interface IDevices {
  devices: Compte[];
  setDevices: React.Dispatch<React.SetStateAction<Compte[]>>;
}
export const donsContext = createContext<IComptes>(
  {
    listDons: [],
    setListDons: () => { },

  },
);
