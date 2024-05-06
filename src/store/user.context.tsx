import {
  ReactElement, ReactNode, createContext, useMemo, useState,
} from 'react';
import { toast } from 'react-toastify';
import { IUser } from '../@types/Home/user';
import axiosInstance from '../utils/axios';

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

const userContext = createContext<IUserContext>({
  user: null,
  setUser: () => { },
});

function UserContextProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<IUser | null>(null);
  const token = sessionStorage.getItem('sessionToken');
  // si j'ai un token et !user alors on recupere l'utilisateur
  if (token && !user) {
    axiosInstance.get('/api/home/@me').then((res) => {
      setUser(res.data);
    }).catch((err) => {
      toast.error(`Une erreur est survenue : ${err.message}`);
    });
  }
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
}

export {
  userContext,
  UserContextProvider,
};
