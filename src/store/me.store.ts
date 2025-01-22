import { create } from 'zustand';
import { IUser } from '../@types/Home/user';
import axiosInstance from '../utils/axios';

interface MeState {
  me: IUser | null;
  setMe: (me: IUser | null) => void;
  fetch: () => Promise<void>;
  logout: () => void;
}

const useMeStore = create<MeState>((set) => ({
  me: null,
  setMe: (me: IUser | null) => set({ me }),
  fetch: async () => {
    try {
      const token = sessionStorage.getItem('sessionToken');
      if (!token) {
        set({ me: null });
        return;
      }
      const response = await axiosInstance.get('/api/home/@me');
      set({ me: response.data });
    } catch (error) {
      sessionStorage.removeItem('sessionToken');
      set({ me: null });
    }
  },
  logout: () => {
    sessionStorage.removeItem('sessionToken');
    set({ me: null });
  },
}));

export default useMeStore;
