import {
  ReactElement, ReactNode, createContext, useMemo, useState,
} from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';
import { ISanction } from '../@types/Home/sanction';
import { IUser } from '../@types/Home/user';

interface ISanctionContext {
  sanctions: ISanction[] | [];
  childrenList: IUser[] | [];
  setSanctions: (sanctions: ISanction[]) => void;
  setChildrenList: (children: IUser[]) => void;
}

const sanctionsContext = createContext<ISanctionContext>({
  sanctions: [],
  setSanctions: () => { },
  childrenList: [],
  setChildrenList: () => { },
});

function SanctionProvider({ children }: { children: ReactNode }): ReactElement {
  const [sanctions, setSanctions] = useState<ISanction[] | []>([]);
  const [childrenList, setChildrenList] = useState<IUser[] | []>([]);
  if (!childrenList || childrenList.length === 0) {
    axiosInstance.get('/api/home/user')
      .then((res) => {
        // on trie par ordre alphabétique
        const sortChildren = res.data.filter(
          (oneChild: IUser) => oneChild.child === true,
        ).sort(
          (a: IUser, b: IUser) => a.first_name.localeCompare(b.first_name),
        );
        setChildrenList(sortChildren);
      })
      .catch((err) => {
        toast.error(`Une erreur est survenue : ${err.message}`);
      });
  }
  if (!sanctions || sanctions.length === 0) {
    axiosInstance.get('/api/home/sanction')
      .then((res) => {
        // on trie par ordre alphabétique
        const sortSanction = res.data.sort(
          // trie des sanction par date.complete desc
          (a: ISanction, b: ISanction) => b.created_at.localeCompare(a.created_at),
        );
        setSanctions(sortSanction);
      })
      .catch((err) => {
        toast.error(`Une erreur est survenue : ${err.message}`);
      });
  }

  const value = useMemo(() => ({
    sanctions, childrenList, setSanctions, setChildrenList,
  }), [sanctions, childrenList, setSanctions, setChildrenList]);
  return (
    <sanctionsContext.Provider value={value}>
      {children}
    </sanctionsContext.Provider>
  );
}

export {
  sanctionsContext,
  SanctionProvider,
};
