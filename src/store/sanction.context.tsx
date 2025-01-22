import {
  ReactElement, ReactNode, createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import axiosInstance from '../utils/axios';
import { ISanction } from '../@types/Home/sanction';
import { IChildrenList, IUser } from '../@types/Home/user';
import useMeStore from './me.store';

interface ISanctionContext {
  sanctions: ISanction[];
  childrenList: IUser[];
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
  const [sanctions, setSanctions] = useState<ISanction[]>([]);
  const [childrenList, setChildrenList] = useState<IUser[]>([]);
  const { me: user } = useMeStore((state) => state);

  const maskSanction = useCallback((oneSanction: ISanction): ISanction => {
    if (
      user?.role.id !== 1
      && dayjs(oneSanction.created_at).isoWeek() >= dayjs().isoWeek()
      && dayjs(oneSanction.created_at).year() >= dayjs().year()
    ) {
      return { ...oneSanction, label: '**********' };
    }
    return oneSanction;
  }, [user]);

  useEffect(() => {
    const fetchChildrenList = async () => {
      try {
        const res = await axiosInstance<IUser[]>('/api/home/user');
        const sortChildren = res.data
          .filter((oneChild) => oneChild.child === true)
          .sort((a, b) => a.username.localeCompare(b.username))
          .map((oneChild) => ({
            id: oneChild.id,
            username: oneChild.username,
          })) as IChildrenList[];
        setChildrenList(sortChildren as IUser[]);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`Une erreur est survenue : ${err.message}`);
        } else {
          toast.error('Une erreur inconnue est survenue');
        }
      }
    };

    if (childrenList.length === 0) {
      fetchChildrenList();
    }
  }, [childrenList.length]);

  useEffect(() => {
    const fetchSanctions = async () => {
      try {
        const res = await axiosInstance<ISanction[]>('/api/home/sanction');
        const sortSanction = res.data
          .sort(
            (a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)),
          )
          .map((oneSanction: ISanction) => maskSanction(oneSanction));
        setSanctions(sortSanction);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`Une erreur est survenue : ${err.message}`);
        } else {
          toast.error('Une erreur inconnue est survenue');
        }
      }
    };

    if (sanctions.length === 0) {
      fetchSanctions();
    }
  }, [maskSanction, sanctions.length]);

  const value = useMemo(() => ({
    sanctions,
    childrenList,
    setSanctions,
    setChildrenList,
  }), [
    sanctions,
    childrenList,
    setSanctions,
    setChildrenList,
  ]);
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
