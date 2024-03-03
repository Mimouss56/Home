import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { initEditorConfig } from '../../../utils/main';

import axiosInstance from '../../../utils/axios';
import ICardPortfolio from '../../../@types/portfolio';
import FileUploader from '../../fileUploader';
import { ErrorAxios } from '../../../@types/error';
import useFormInput from '../../../hook/useFormInput';

interface ModalAddItemProps {
  onAddElement: (listPortfolio: ICardPortfolio) => void;
}

const initFormData = {
  id: 0,
  nameSite: '',
  description: '',
  urlImg: '',
  urlSite: '',
};

function ModalAddFolio({ onAddElement }: ModalAddItemProps) {
  const {
    form: formData,
    handleChange,
    setForm,
  } = useFormInput(initFormData as ICardPortfolio);
  const [imageFile, setImageFile] = useState<File | undefined>();

  const [editorContent, setEditorContent] = useState<string>('');

  const fetchJobData = useCallback(async (id: number) => {
    if (id === 0) {
      setForm(initFormData);
      return;
    }
    try {
      const response = await axiosInstance.get(`/api/home/portfolio/${id}`);
      const jobData = response.data;

      setForm({
        nameSite: jobData.nameSite || '',
        description: jobData.description || '',
        urlImg: jobData.urlImg || '',
        id,
        urlSite: jobData.urlSite || '',
      });
    } catch (error) {
      toast.error('Erreur lors de la récupération des données du Portfolio à éditer');
    }
  }, [setForm]);

  const handleUpload = async (fileUploaded: File) => {
    try {
      const formUpload = new FormData();
      formUpload.append('image', fileUploaded);

      const response = await axiosInstance.post('/api/home/upload', formUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = response.data;
      setForm((prev) => ({ ...prev, urlImg: imageUrl }));

      return imageUrl;
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as ErrorAxios;
      toast.warning(errorData?.message || 'Une erreur s\'est produite lors de l\'upload de l\'image.');
    }
    return null;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, ...inputData } = formData;
    inputData.description = editorContent;

    if (imageFile) {
      const imageUrl = await handleUpload(imageFile);

      if (!imageUrl) {
        return;
      }
      inputData.urlImg = imageUrl;
    }

    try {
      const endpoint = id !== 0 ? `/api/home/portfolio/${formData.id}` : '/api/home/portfolio';
      const method = id !== 0 ? axiosInstance.put : axiosInstance.post;

      // Intégrer l'URL de l'image dans l'inputData

      const response = await method(endpoint, inputData);

      toast.success(response.data.message);

      // Supprime les propriétés indésirables de la réponse avant de les ajouter
      const { message, code, ...cleanedData } = response.data;

      onAddElement(cleanedData);
    } catch (err) {
      const error = err as Error;
      toast.warning(error.message || 'Une erreur s\'est produite lors de la sauvegarde.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/api/home/portfolio/${id}`);
      toast.success(response.data.message);
      onAddElement(response.data);
    } catch (err) {
      const error = err as Error;
      toast.warning(error.message || 'Une erreur s\'est produite lors de la suppression.');
    }
  };

  const handleFileSelect = (file: File | undefined) => {
    setImageFile(file);
  };

  useEffect(() => {
    const addItemModal = document.getElementById('addPortfolio');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const id = button.getAttribute('data-bs-id');
        if (id === null) return;
        fetchJobData(parseInt(id, 10));
      });
    }
  }, [fetchJobData]);

  return (
    <form onSubmit={handleSave}>
      <div className="modal fade" id="addPortfolio">
        <div className="modal-dialog modal-dialog-centered modal-xl ">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Ajouter un élément</h2>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-globe2 px-1" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom du Site"
                    aria-label="nameSite"
                    aria-describedby="basic-addon1"
                    name="nameSite"
                    value={formData.nameSite}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-file-earmark-text px-1" />
                </span>
                <Editor
                  init={initEditorConfig}
                  initialValue={formData.description}
                  textareaName="description"
                  onEditorChange={(description) => setEditorContent(description)}
                />

                {/* <textarea
                  className="form-control"
                  placeholder="Description"
                  aria-label="Description"
                  aria-describedby="basic-addon1"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                /> */}
              </div>
              <FileUploader submit={() => handleFileSelect} img={formData.urlImg} />
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  https://
                </span>
                <input
                  className="form-control"
                  placeholder="Url du site"
                  aria-label="Url du site"
                  aria-describedby="basic-addon1"
                  name="urlSite"
                  value={formData.urlSite}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => handleDelete(formData.id)}
                >
                  Delete
                </button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ModalAddFolio;
