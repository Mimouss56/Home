import { create } from 'zustand';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';
import { IUser } from '../@types/Home/user';
import useNotifStore from './notif.store';

interface IUserState {
  user: null | IUser;
  error: string

  logout: () => void;
  login: (username: string, password: string) => Promise<IUser>;
  // handleApiResponse: (response: AxiosResponse, isLogin?: boolean) => boolean;
  // handleError: (error: any) => boolean;
  // register: (dataUser: any) => Promise<boolean>;
  // loginWithToken: () => Promise<boolean>;

}
const useUserStore = create<IUserState>((set) => ({
  user: null,
  error: '',

  logout: () => {
    set({ user: null });
  },

  login: async (username, password) => {
    try {
      const res = await axiosInstance.post('/api/home/login', { username, password });
      const {
        sessionToken, message, user, dataNotif,
      } = res.data;

      set(() => ({
        user,
      }));
      // on ajoute dans le notifstore les notifs
      useNotifStore.getState().setFeedBack(dataNotif.feedback);
      useNotifStore.getState().setSanction(dataNotif.sanction);

      sessionStorage.setItem('sessionToken', sessionToken);
      toast.success(`🦄 ${message} !`);
      return user;
    } catch (error) {
      const { response } = error as { response: { data: string } };
      set({ error: response.data });
      return error;
    }
  },

  // register: async (dataUser) => {
  //   try {
  //     const response = await axiosInstance.post('/auth/register', dataUser);
  //     return get().handleApiResponse(response);
  //   } catch (error) {
  //     return get().handleError();
  //   }
  // },

  // loginWithToken: async () => {
  //   try {
  //     const response = await axiosInstance.get('/me');
  //     return get().handleApiResponse(response, true);
  //   } catch (error) {
  //     return get().handleError();
  //   }
  // },
  // handleApiResponse: (response: AxiosResponse, isLogin = false) => {
  //   const { data } = response;

  //   if (data.sessionToken) {
  //     set({ user: data.data, isAuthentified: true });

  //     // navigate to dashboard
  //     if (isLogin) {
  //       set({ isLoading: false });
  //     }
  //     return true;
  //   }
  //   // send error toast

  //   return false;
  // },

}));

export default useUserStore;
