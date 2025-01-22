import { create } from 'zustand';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { IUser } from '../@types/Home/user';

interface IMoussStore {
  mouss: IUser | null;
  isLoading: boolean;
  error: Error | null;
  fetch: () => Promise<void>;
}

const useMoussStore = create<IMoussStore>((set, get) => ({
  mouss: null,
  isLoading: false,
  error: null,
  fetch: async () => {
    if (get().mouss) return;
    try {
      set({ isLoading: true });
      const result: AxiosResponse<IUser> = await axiosInstance.get(
        `/api/home/user/${import.meta.env.VITE_MOUSS_ID}`,
      );
      set({
        mouss: result.data,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      const error = err as AxiosError;
      toast.error(`Une erreur est survenue : ${error.message}`);
      set({
        error,
        isLoading: false,
      });
    }
  },

}));

export default useMoussStore;

export function MoussLoader() {
  const { fetch } = useMoussStore((state) => state);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return null;
}
