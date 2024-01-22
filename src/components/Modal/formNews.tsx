import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { ICreateNews, INews, ITag } from '../../@types/Home/news';
import { ValueTargetForm } from '../../@types/event';
import axiosInstance from '../../utils/axios';
import { ErrorSanctionProps } from '../../@types/error';
import { ICardNews } from '../../@types/Home/card';
// Mocked
interface NewsFormProps {
  onAddElement: (data: ICardNews) => void;
}

const initFormData = {
  id: 0,
  title: '',
  content: '',
  draft: false,
};

function ModalAddNews({ onAddElement }: NewsFormProps) {
  const [formData, setFormData] = useState<ICreateNews>(initFormData);

  const fetchData = async (id: number) => {
    if (id === 0) {
      setFormData(initFormData);
      return;
    }
    try {
      const response = await axiosInstance(`/home/news/${id}`);
      const data = await response.data;
      setFormData(data);
    } catch (error) {
      toast.error('Erreur lors de la récupération des données des News à éditer');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, ...inputData } = formData;
    try {
      const endpoint = id !== 0 ? `/api/home/news/${formData.id}` : '/api/home/news';
      const method = id !== 0 ? axiosInstance.put : axiosInstance.post;

      // Intégrer l'URL de l'image dans l'inputData

      const response = await method(endpoint, inputData);

      toast.success(response.data.message);
      const { message, code, ...cleanedData } = response.data;

      onAddElement(cleanedData);
    } catch (err) {
      const error = err as Error;
      toast.warning(error.message || 'Une erreur s\'est produite lors de la sauvegarde.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, draft: event.target.checked }));
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
  }, []);

  return (
    <div className="modal" tabIndex={-1} id="addModalNews">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{formData.id ? 'Edit News' : 'Add News'}</h5>
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
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Contenu
                </span>
                <textarea
                  className="form-control"
                  placeholder="content"
                  aria-label="content"
                  aria-describedby="basic-addon1"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>
              {/* <Editor
                value={formData.content}
                init={{
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
                }}
                onChange={handleChange}
                id="content"
                name="content"
              /> */}
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
                  checked={formData.draft || false}
                  {...(formData.id && { id: formData.id.toString() })}
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
