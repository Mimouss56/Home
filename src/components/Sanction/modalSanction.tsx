import { toast } from 'react-toastify';
import { FormEvent, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { ISanctionResult } from '../../@types/sanction';

interface ModalAddSanctionProps {
  onAddSanction: (sanction: ISanctionResult) => void;
}

function ModalAddSanction({ onAddSanction }: ModalAddSanctionProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const newUser = {
      label: content,
      author_id: user.id,
    };
    setContent('');

    axiosInstance.post('/sanction', newUser).then((res) => {
      toast.success(
        res.data.message,
      );
      onAddSanction(res.data);
    }).catch((err) => {
      toast.warning(err.message);
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="modal fade" id="ModalAddSanction" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Détails de la sanction</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <textarea name="reason" className="form-control" required value={content} onChange={(e) => setContent(e.currentTarget.value)} />
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="submit"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Ajouter
              </button>

            </div>
          </div>
        </div>
      </div>

    </form>
    // <Form
    //   onFinish={handleSubmit}
    // >
    // </Form>
  );
}

export default ModalAddSanction;
