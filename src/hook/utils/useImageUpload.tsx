import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { ErrorAxios } from '../../@types/error';

const useImageUpload = () => {
  const [imageFile, setImageFile] = useState<File | null>();
  const [formData, setFormData] = useState({ urlImg: '' });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    const files = element.files as FileList;
    const selectedFile = files ? files[0] : undefined;
    if (selectedFile) {
      try {
        const formUpload = new FormData();
        formUpload.append('image', selectedFile);

        const response = await axiosInstance.post('/home/upload', formUpload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const imageUrl = response.data;
        setFormData((prev) => ({ ...prev, urlImg: imageUrl }));

        return imageUrl;
      } catch (err) {
        const error = err as AxiosError;
        const errorData = error.response?.data as ErrorAxios;
        toast.warning(errorData?.message || 'Une erreur s\'est produite lors de l\'upload de l\'image.');
      }
    }
    return null;
  };

  const resetImageUpload = () => {
    setImageFile(null);
  };

  return {
    imageFile, setImageFile, handleUpload, resetImageUpload,
  };
};

export default useImageUpload;
