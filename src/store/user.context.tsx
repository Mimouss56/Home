import {
  ReactElement, ReactNode, createContext, useMemo, useState,
} from 'react';
import { IUser } from '../@types/Home/user';

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
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
}

export {
  userContext,
  UserProvider,
};
