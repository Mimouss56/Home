import { Job } from './Home/job';

export interface AxiosresponseDataJob {
  data: Job[];
  status: number;
  statusText: string;
}
