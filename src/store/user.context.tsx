import {
  ReactElement, ReactNode, createContext, useEffect, useMemo, useState,
} from 'react';
import { IUser } from '../@types/Home/user';
import axiosInstance from '../utils/axios';
import { MoussProvider } from './mouss.context';

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

const userContext = createContext<IUserContext>({
  user: null,
  setUser: () => { },
});

function UserProvider({ children }: { children: ReactNode }): ReactElement {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('sessionToken');
    if (token && !user) {
      axiosInstance.get('/api/home/@me').then((res) => {
        setUser(res.data);
      }).catch(() => {
        // toast.error(err.message); // Uncomment if you have a toast library
        sessionStorage.removeItem('sessionToken');
        setUser(null);
      });
    }
  }, [user]);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <userContext.Provider value={value}>
      <MoussProvider>
        {children}
      </MoussProvider>
    </userContext.Provider>
  );
}

export {
  userContext,
  UserProvider,
};
