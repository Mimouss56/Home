// api.ts
import axiosInstance from '../../../utils/axios';
import { ISanction } from '../../../@types/Home/sanction';

export const fetchSanctions = async (url: string): Promise<ISanction[]> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const postSanction = async (data: ISanction): Promise<ISanction> => {
  const response = await axiosInstance.post('/home/sanction', data);
  return response.data;
};

export const updateSanction = async (id: number, data: ISanction): Promise<ISanction> => {
  const response = await axiosInstance.put(`/home/sanction/${id}`, data);
  return response.data;
};

export const deleteSanction = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/sanction/${id}`);
};
