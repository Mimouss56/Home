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

    const { id, ...formWithoutId } = form;
    try {
      let response;
      if (Number(id) !== 0) {
        response = await axiosInstance.put(`${endpoint}/${id}`, formWithoutId);
      } else {
        response = await axiosInstance.post(endpoint, formWithoutId);
      }

      const { message, code, ...cleanedData } = response.data;
      onAddElement(cleanedData);
      toast.success(message);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      if (response) {
        toast.error(`🦄 ${response.data.error || response.data.message} ! `);
      } else {
        toast.error('Une erreur inattendue s\'est produite.');
      }
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
