import { Job } from './job';

export interface AxiosresponseDataJob {
  data: Job[];
  status: number;
  statusText: string;
}
