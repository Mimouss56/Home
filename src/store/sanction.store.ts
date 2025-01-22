import { create } from 'zustand';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { ISanction } from '../@types/Home/sanction';
import useMeStore from './me.store';

interface ISanctionStore {
  sanctions: ISanction[] | [];
  setSanctions: (sanctions: ISanction[]) => void;
  fetchSanctions: () => Promise<void>;
  maskSanction: (sanction: ISanction) => ISanction;
  updateSanction: (sanction: ISanction) => Promise<void>;
  patchSanction: (id: number, data: { [key: string]: any }) => Promise<void>;
  deleteSanction: (id: number) => Promise<void>;
}

const useSanctionStore = create<ISanctionStore>((set, get) => ({
  sanctions: [],

  setSanctions: (sanctions: ISanction[]) => set({ sanctions }),

  maskSanction: (sanction: ISanction) => {
    const user = useMeStore.getState().me;
    if (
      user?.role.id !== 1
      && dayjs(sanction.created_at).isoWeek() >= dayjs().isoWeek()
      && dayjs(sanction.created_at).year() >= dayjs().year()
    ) {
      return { ...sanction, label: '**********' };
    }
    return sanction;
  },

  fetchSanctions: async () => {
    try {
      const res = await axiosInstance<ISanction[]>('/api/home/sanction');
      const sortSanction = res.data
        .sort((a, b) => dayjs(b.created_at).diff(dayjs(a.created_at)))
        .map((oneSanction: ISanction) => get().maskSanction(oneSanction));
      set({ sanctions: sortSanction });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Une erreur est survenue : ${err.message}`);
      } else {
        toast.error('Une erreur inconnue est survenue');
      }
    }
  },
  updateSanction: async (sanction: ISanction) => {
    try {
      const res = await axiosInstance.put(`/api/home/sanction/${sanction.id}`, sanction);
      const newListSanctions = get().sanctions.map((oneSanction) => {
        if (oneSanction.id === sanction.id) {
          return res.data;
        }
        return oneSanction;
      });
      set({ sanctions: newListSanctions });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Une erreur est survenue : ${err.message}`);
      } else {
        toast.error('Une erreur inconnue est survenue');
      }
    }
  },
  patchSanction: async (id: number, data: { [key: string]: any }) => {
    try {
      const res = await axiosInstance.patch(`/api/home/sanction/${id}`, data);
      const newListSanctions = get().sanctions.map((oneSanction) => {
        if (oneSanction.id === id) {
          return res.data;
        }
        return oneSanction;
      });
      set({ sanctions: newListSanctions });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Une erreur est survenue : ${err.message}`);
      } else {
        toast.error('Une erreur inconnue est survenue');
      }
    }
  },
  deleteSanction: async (id: number) => {
    try {
      await axiosInstance.delete(`/api/home/sanction/${id}`);
      const newListSanctions = get().sanctions.filter((sanction) => sanction.id !== id);
      set({ sanctions: newListSanctions });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Une erreur est survenue : ${err.message}`);
      } else {
        toast.error('Une erreur inconnue est survenue');
      }
    }
  },
}));

export default useSanctionStore;

export function SanctionLoader() {
  const { fetchSanctions } = useSanctionStore((state) => state);
  useEffect(() => {
    fetchSanctions();
  }, [fetchSanctions]);
  return null;
}
