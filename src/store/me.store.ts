import { create } from 'zustand';
import { toast } from 'react-toastify';
import { IUser } from '../@types/Home/user';
import axiosInstance from '../utils/axios';

interface MeState {
  me: IUser | null;
  loading?: boolean;
  error?: string;
  setMe: (me: IUser | null) => void;
  fetch: () => Promise<void>;
  logout: () => void;
  login: (username: string, password: string) => void;
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
  login: async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/api/home/login', {
        username,
        password,
      });
      const { sessionToken, user, message } = response.data;
      sessionStorage.setItem('sessionToken', sessionToken);
      set({ me: user });
      toast.success(`🦄 ${message} !`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosError = err as { response?: { data: string } };
        set({ error: axiosError.response?.data });
        toast.error(`🦄 ${axiosError.response?.data}`);
      }
    }
  },
}));

export default useMeStore;
