import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import { ICreateNews, INews, ITag } from '../../@types/Home/news';
import { ValueTargetForm } from '../../@types/event';
import axiosInstance from '../../utils/axios';
import { ErrorSanctionProps } from '../../@types/error';
// Mocked
interface NewsFormProps {
  onSubmit: () => void;
}

const initialValues = {
  title: '',
  content: '',
  tags: [],
  draft: false,
};

function ModalAddNews({ onSubmit }: NewsFormProps) {
  const [currentNews, setCurrentNews] = useState<ICreateNews>(initialValues);

  const fetchData = async (id: number) => {
    try {
      const response = await axiosInstance(`/home/news/${id}`);
      const data = await response.data;
      setCurrentNews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, content, draft } = e.target as typeof e.target & {
      title: ValueTargetForm;
      content: ValueTargetForm;
      draft: { checked: boolean };
    };

    const inputData = {
      title: title.value,
      content: content.value,
      draft: draft.checked,
    };
    if (currentNews) {
      try {
        const result = await axiosInstance.put(`/api/home/news/${currentNews.id}`, inputData);
        toast.success(result.data.message);
      } catch (error) {
        const { response } = error as ErrorSanctionProps;
        toast.error(`🦄 ${response.data.error || response.data.message} ! `);
      }
    } else {
      try {
        const result = await axiosInstance.post('/api/home/news', inputData);
        toast.success(result.data.message);
      } catch (error) {
        const { response } = error as ErrorSanctionProps;
        toast.error(`🦄 ${response.data.error || response.data.message} ! `);
      }
    }
    setCurrentNews(initialValues);
    onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNews((prev) => ({ ...prev, draft: event.target.checked }));
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
            <h5 className="modal-title">{currentNews ? 'Edit News' : 'Add News'}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>
          <form onSubmit={handleSubmit} className="m-5">

            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentNews.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <Editor
                initialValue={currentNews.content}
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
                onEditorChange={() => handleChange}
                textareaName="content"
              />
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
                  checked={currentNews.draft || false}
                  {...(currentNews.id && { id: currentNews.id.toString() })}
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
