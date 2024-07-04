import {
  useEffect, useRef,
} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { AxiosResponse } from 'axios';
import axiosInstance from '../../../utils/axios';
import useFormInput from '../../../hook/useFormInput';
import { initEditorConfig } from '../../../utils/main';
import SwitchButton from '../../Form/Switch';
import { INews } from '../../../@types/Home/news';

interface NewsFormProps {
  onAddElement: (data: INews) => void;
}

const initFormData: INews = {
  id: 0,
  title: '',
  content: '',
  draft: false,
};
const handleRetrieveModal = async (
  event: Event,
  setForm: (arg0: INews) => void,
  endpoint: string,
  searchDataset: string,
) => {
  const { relatedTarget } = event as unknown as { relatedTarget: EventTarget };
  const button = relatedTarget as HTMLButtonElement;
  try {
    const url = `${endpoint}/${button.dataset[searchDataset]}`;
    const dataNews: AxiosResponse = await axiosInstance.get(url);
    setForm(dataNews.data);
  } catch (error) {
    setForm(initFormData);
  }
};

const retrieveIDModal = (
  setForm: ((arg0: INews) => void),
  addItemRef: HTMLDivElement | null,
  endpoint: string,
  searchDataset: string,
) => {
  if (addItemRef) {
    addItemRef.addEventListener(
      'show.bs.modal',
      (event) => handleRetrieveModal(event, setForm, endpoint, searchDataset),
    );
  }
  // on remove le addEventListener
  return () => {
    if (addItemRef) {
      addItemRef.removeEventListener('show.bs.modal', () => { });
    }
  };
};
export default function ModalAddNews({ onAddElement }: NewsFormProps) {
  const {
    form, setForm, handleChange, handChecked, handleSave,
  } = useFormInput(initFormData);

  const addNewsForm = useRef(null);

  useEffect(() => {
    if (addNewsForm.current) {
      retrieveIDModal(
        setForm,
        addNewsForm.current,
        '/api/home/news',
        'bsId',
      );
    }
  }, [setForm]);

  return (
    <form
      onSubmit={(e) => handleSave(e, '/api/home/news', onAddElement)}
      className="modal"
      tabIndex={-1}
      id="addModalNews"
      ref={addNewsForm}
    >
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
                apiKey="vl56uroxn6dln5wlqmza3uuqjnq34ypr2y4fehtrmfgfbn6j"
                init={initEditorConfig}
                initialValue={form.content}
                textareaName="content"
                onEditorChange={(content) => setForm({ ...form, content })}
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
            <SwitchButton
              name="draft"
              active={form.draft}
              onChange={handChecked}
              id={form.id.toString()}
              title="Brouillon"
            />
          </div>
        </div>
      </div>
    </form>

  );
}
// const fetchData = useCallback(async (id: number) => {
//   if (id === 0) {
//     setForm(initFormData);
//     return;
//   }
//   try {
//     const response = await axiosInstance.get(`/api/home/news/${id}`);
//     const data = await response.data;
//     setForm(data);
//   } catch (error) {
//     toast.error('Erreur lors de la récupération des données des News à éditer');
//   }
// }, [setForm]);
