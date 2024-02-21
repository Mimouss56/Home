/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { ErrorSanctionProps } from '../@types/error';
import axiosInstance from './axios';

const useFormInput = <T extends object>(initialValue: T) => {
  const [form, setForm] = useState<T>(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>,
    endpoint: string,
    onAddElement: (arg0: any) => void,
  ) => {
    e.preventDefault();
    try {
      let response;
      const { id, ...formWithoutId } = form as any;

      if (id !== 0 && Number.isNaN(id)) {
        response = await axiosInstance.put(`${endpoint}/${id}`, formWithoutId);
      } else {
        response = await axiosInstance.post(endpoint, formWithoutId);
      }

      // response = await axiosInstance.post(endpoint, form);

      const { message, code, ...cleanedData } = response.data;
      onAddElement(cleanedData);
      toast.success(message);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  return {
    form,
    handleChange,
    setForm,
    handleSave,
  };
};

export default useFormInput;
