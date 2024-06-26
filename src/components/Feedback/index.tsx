import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ErrorSanctionProps } from '../../@types/error';

import axiosInstance from '../../utils/axios';
import Textarea from '../Form/textarea';

const initData = {
  name: '',
  email: '',
  message: '',
  path: '',
  draft: false,
};

function Feedback() {
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

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // on envoie le feedback au serveur
    try {
      const response = await axiosInstance.post('/api/home/feedback', feedback);
      toast.success(response.data.message);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
    // on ferme la modal
    const modal = document.getElementById('feedbackModal');
    const backdrop = document.querySelector('.modal-backdrop');
    backdrop?.remove();
    modal?.classList.remove('show');
    // on vide les champs
    setFeedback(initData);
  };

  // on récupe les component de la page actuelle au click sur le bouton feedback
  return (
    <>
      <div
        className="position-fixed "
        style={{ top: '75%', zIndex: 1000 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#feedbackModal"
          className="btn btn-primary rounded-start-0 text-light z-0 "
        >
          Feedback
        </button>
      </div>
      <form onSubmit={handleSubmit}>

        <div className="modal fade" id="feedbackModal" tabIndex={-1} aria-labelledby="feedbackModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-light">
                <h5 className="modal-title" id="feedbackModalLabel">Un petit Feedback est toujours agréable</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Nom</span>
                  <input
                    type="name"
                    className="form-control"
                    id="recipient-name"
                    name="name"
                    onChange={handleChange}
                    value={feedback.name}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">Email</span>
                  <input
                    type="email"
                    className="form-control"
                    id="recipient-name"
                    name="email"
                    onChange={handleChange}
                    value={feedback.email}
                  />
                </div>
                <Textarea
                  title="Message"
                  text={feedback.message}
                  onChange={handleChange}
                  name="message"
                  icon={null}
                  leng={500}
                />

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary btn-sm">Send message</button>
              </div>
            </div>
          </div>
        </div>
      </form>

    </>

  );
}

export default Feedback;
