import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import axiosInstance from '../../../utils/axios';
import { ICardNews } from '../../../@types/Home/card';
import useFormInput from '../../../hook/useFormInput';

interface NewsFormProps {
  onAddElement: (data: ICardNews) => void;
}

const initFormData = {
  id: 0,
  title: '',
  content: '',
  draft: false,
};

const initEditorConfig = {
  height: 500,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
  ],
  toolbar: 'undo redo | formatselect | '
    + 'bold italic backcolor | alignleft aligncenter '
    + 'alignright alignjustify | bullist numlist outdent indent | '
    + 'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
};

function ModalAddNews({ onAddElement }: NewsFormProps) {
  const {
    form, setForm, handleChange,
  } = useFormInput(initFormData);
  const [editorContent, setEditorContent] = useState<string>('');

  const fetchData = useCallback(async (id: number) => {
    if (id === 0) {
      setForm(initFormData);
      return;
    }
    try {
      const response = await axiosInstance(`/api/home/news/${id}`);
      const data = await response.data;
      setForm(data);
    } catch (error) {
      toast.error('Erreur lors de la récupération des données des News à éditer');
    }
  }, [setForm]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const { id } = form;
    const inputData = {
      title: form.title,
      content: editorContent,
      draft: form.draft,
    };

    try {
      const endpoint = id !== 0 ? `/api/home/news/${form.id}` : '/api/home/news';
      const method = id !== 0 ? axiosInstance.put : axiosInstance.post;
      const response = await method(endpoint, inputData);

      toast.success(response.data.message);
      const { message, code, ...cleanedData } = response.data;

      onAddElement(cleanedData);
    } catch (err) {
      const error = err as Error;
      toast.warning(error.message || 'Une erreur s\'est produite lors de la sauvegarde.');
    }
  }, [editorContent, form, onAddElement]);

  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, draft: event.target.checked }));
  };

  useEffect(() => {
    const addItemModal = document.getElementById('addModalNews');

    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const id = button.getAttribute('data-bs-id') || '0';
        fetchData(parseInt(id, 10));
      });
    }
  }, [fetchData]);

  return (
    <div className="modal" tabIndex={-1} id="addModalNews">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{form.id ? 'Edit News' : 'Add News'}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>
          <form onSubmit={handleSubmit} className="m-5">

            <div className="mb-3">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Title
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group mb-3">
                <Editor
                  init={initEditorConfig}
                  initialValue={form.content}
                  textareaName="content"
                  onEditorChange={(content) => setEditorContent(content)}
                />
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save
              </button>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  name="draft"
                  checked={form.draft || false}
                  {...(form.id && { id: form.id.toString() })}
                  onChange={handleSwitch}
                />
                Brouillon
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalAddNews;
