import {
  ReactElement, ReactNode, createContext, useMemo, useState,
} from 'react';
import { toast } from 'react-toastify';
import { IEntreprise } from '../@types/Home/ent';
import axiosInstance from '../utils/axios';

interface IEntContext {
  ent: IEntreprise[] | [];
  setEnt: (ent: IEntreprise[]) => void;
}

const entContext = createContext<IEntContext>({
  ent: [] as IEntreprise[] | [],
  setEnt: () => { },
});

function EntProvider({ children }: { children: ReactNode }): ReactElement {
  const [ent, setEnt] = useState<IEntreprise[] | []>([]);
  if (!ent || ent.length === 0) {
    axiosInstance.get('/api/home/ent')
      .then((res) => {
        // on trie par ordre alphabétique
        const entTrier = res.data.sort(
          (a: IEntreprise, b: IEntreprise) => a.name.localeCompare(b.name),
        );
        setEnt(entTrier);
      })
      .catch((err) => {
        toast.error(`Une erreur est survenue : ${err.message}`);
      });
  }

  const value = useMemo(() => ({ ent, setEnt }), [ent, setEnt]);
  return (
    <entContext.Provider value={value}>
      {children}
    </entContext.Provider>
  );
}

export {
  entContext,
  EntProvider,
};
