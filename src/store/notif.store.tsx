import { create } from 'zustand';
import { ISanction } from '../@types/Home/sanction';
import { INotif } from '../@types/notifToast';

interface NotifStore {
  feedback: INotif[];
  sanction: ISanction[];

  setFeedBack: (feedBack: INotif[]) => void;
  setSanction: (sanction: ISanction[]) => void;
  // removeFeedBack: () => void;
  // removeSanction: () => void;

}

const useNotifStore = create<NotifStore>((set) => ({
  feedback: [],
  sanction: [],

  setFeedBack: (feedback) => {
    set({ feedback });
  },
  setSanction: (sanction) => {
    set({ sanction });
  },
  // removeFeedBack: (feedBack) => {
  //   const newListe = feedback.filter((f) => f.id !== id);
  //   set({ feedback: newListe });
  // },
  // removeSanction: () => {
  //   set({ sanction: null });
  // },
}));

export default useNotifStore;
