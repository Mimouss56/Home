import { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { ErrorSanctionProps } from '../@types/error';
import axiosInstance from '../utils/axios';

const useFormInput = <T extends object>(initialValue: T) => {
  const [form, setForm] = useState<T>(initialValue);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement>,
    endpoint: string,
    onAddElement: (arg0: T) => void,
  ) => {
    e.preventDefault();
    try {
      let response;

      const { id, ...formWithoutId } = form as T & { id: number };

      if (id === 0) {
        response = await axiosInstance.post(endpoint, formWithoutId);
      } else {
        response = await axiosInstance.put(`${endpoint}/${id}`, formWithoutId);
      }
      const { message, code, ...cleanedData } = response.data;
      onAddElement(cleanedData as T);
      toast.success(message);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      setError(true);
      setErrorMessage(response.data.error || response.data.message);
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  const handleDelete = async (id: number, endpoint: string, onAddElement: (arg0: T) => void) => {
    try {
      const response = await axiosInstance.delete(`${endpoint}/${id}`);
      onAddElement(response.data);
      toast.success(response.data.message);
    } catch (err) {
      const { response } = err as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  return {
    form,
    setForm,
    handChecked,
    handleChange,
    handleSave,
    handleDelete,
    error,
    setError,
    errorMessage,
    setErrorMessage,
  };
};

export default useFormInput;
