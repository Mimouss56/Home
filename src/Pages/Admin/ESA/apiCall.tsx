import axiosInstance from '../../../utils/axios';
import { IcreateStudent } from '../../../@types/ESA/student';

export const fetchStudents = async (): Promise<IcreateStudent[]> => {
  const response = await axiosInstance.get('/api/esa/child');
  return response.data;
};

export const updateStudent = async (data: IcreateStudent) => {
  const { id, ...rest } = data; // id n'est pas nécessaire pour un PUT
  await axiosInstance.put(`/api/esa/child/${id}`, rest);
};

export const createStudent = async (data: IcreateStudent) => {
  const { id, ...rest } = data; // id n'est pas nécessaire pour un POST
  await axiosInstance.post('/api/esa/child', rest);
};

export const deleteStudent = async (id: number) => {
  await axiosInstance.delete(`/api/esa/child/${id}`);
};

export const updateStudentClass = async (id: string, classe: string) => {
  await axiosInstance.put(`/api/esa/child/${id}`, {
    classe,
  });
};
