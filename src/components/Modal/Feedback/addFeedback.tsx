import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Textarea from '../../Form/textarea';
import ButtonEndModal from '../../Form/ButtonFooterModal';
import InputText from '../../Form/inputText';
import useFormInput from '../../../hook/useFormInput';
import IFeedback from '../../../@types/Home/feedback';

const initData = {
  id: 0,
  name: '',
  email: '',
  message: '',
  path: '',
  draft: false,
};

export default function AddFeedBack({ onAddElement }: { onAddElement: (data: IFeedback) => void }) {
  const { handleSave } = useFormInput(initData);
  const location = useLocation();
  const { pathname } = location;
  const [feedback, setFeedback] = useState(initData);

  const handleChange = (event: { target: { name: string; value: string; }; }) => {
    setFeedback({
      ...feedback,
      path: pathname,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      onSubmit={(e) => handleSave(e, '/api/home/feedback', onAddElement)}
      className="modal fade"
      id="feedbackModal"
      tabIndex={-1}
      aria-labelledby="feedbackModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-light">
            <h5 className="modal-title" id="feedbackModalLabel">Un petit Feedback est toujours agréable</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <InputText
              title="Nom"
              name="name"
              text={feedback.name}
              icon="person"
              onChange={handleChange}
            />
            <InputText
              title="Email"
              name="email"
              text={feedback.email}
              icon="envelope"
              onChange={handleChange}
            />
            <Textarea
              title="Message"
              text={feedback.message}
              onChange={handleChange}
              name="message"
              icon={null}
              leng={500}
            />

          </div>
          <ButtonEndModal />

        </div>
      </div>
    </form>
  );
}
