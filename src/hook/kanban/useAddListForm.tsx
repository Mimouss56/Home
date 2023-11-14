import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

export interface AddListFormData {
  content: string;
}

interface AddListForm {
  formData: AddListFormData;
  error: string;
  loading: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

const useAddListForm = (updateLists: () => void): AddListForm => {
  const [formData, setFormData] = useState({ content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.content.trim()) {
      setError('Le nom de la liste ne peut pas être vide.');
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post('/kanban/lists', {
        name: formData.content,
      });
      updateLists();
      setFormData({ content: '' });
    } catch (err) {
      setError('Une erreur s\'est produite lors de l\'ajout de la liste. Veuillez réessayer.');
      toast.error(`Error adding list: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useAddListForm;
