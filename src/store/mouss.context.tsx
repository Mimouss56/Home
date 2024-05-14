import {
  ReactElement, ReactNode, createContext, useMemo, useState,
} from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';
import { IUser } from '../@types/Home/user';
import { MoussID } from '../../config.json';

interface IMoussContext {
  mouss: IUser | undefined;
  setMouss: (mouss: IUser) => void;
}

const moussContext = createContext<IMoussContext>({
  mouss: {} as IUser,
  setMouss: () => { },
});

function MoussProvider({ children }: { children: ReactNode }): ReactElement {
  const [mouss, setMouss] = useState<IUser>();
  if (!mouss) {
    axiosInstance.get(`/api/home/user/${MoussID}`)
      .then((res) => {
        // on trie par ordre alphabétique
        setMouss(res.data.user);
      })
      .catch((err) => {
        toast.error(`Une erreur est survenue : ${err.message}`);
      });
  }

  const value = useMemo(() => ({ mouss, setMouss }), [mouss, setMouss]);
  return (
    <moussContext.Provider value={value}>
      {children}
    </moussContext.Provider>
  );
}

export {
  moussContext,
  MoussProvider,
};
