export interface INotif {
  id: number;
  name: string;
  message: string;
  read: boolean;
  type: 'feedback' | 'sanction';
}
