import { create } from 'zustand';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { IChildrenList, IUser } from '../@types/Home/user';

interface IChildrenStore {
  child: IChildrenList[];
  fetchChildren: () => Promise<void>;
}

const useChildrenStore = create<IChildrenStore>((set) => ({
  child: [],
  fetchChildren: async () => {
    try {
      console.log('fetchChildren');
      
      const { data } = await axiosInstance.get<IUser[]>('/api/home/user');
      const sortedChildren = data
        .filter(({ child }) => child)
        .sort((a, b) => a.username.localeCompare(b.username))
        .map(({ id, username }) => ({ id, username }));

      set({ child: sortedChildren });
    } catch (err) {
      toast.error(
        err instanceof Error
          ? `Une erreur est survenue : ${err.message}`
          : 'Une erreur inconnue est survenue',
      );
    }
  },
}));

export default useChildrenStore;

export function ChildLoader() {
  const { fetchChildren } = useChildrenStore((state) => state);

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  return null;
}
