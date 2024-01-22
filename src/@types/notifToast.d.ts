export interface INotifToast {
  text : string;
  color : string;
}

export interface INotif {
  id: number;
  name: string;
  message: string;
  read: boolean;
  type: 'feedback' | 'sanction';
}
