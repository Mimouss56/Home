export default interface IFeedback {
  id: number;
  name: string;
  email: string;
  message: string;
  path: string;
  draft: boolean;
  created_at: string;
}
