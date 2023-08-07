import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axiosInstance from '../../utils/axios';

const { TextArea } = Input;

interface FormValues {
  reason: string;
}

function ModalAddSanction() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (values: FormValues) => {
    // on recupere les infos du user connecté
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const newUser = {
      label: values.reason,
      author_id: user.id,
    };
    axiosInstance.post('/sanction', newUser).then((res) => {
      if (res.data.error) {
        setError(true);
        setErrorMessage(res.data.error);
      } else {
        setErrorMessage('Sanction ajoutée');
      }
    })
      .catch((err) => {
        setErrorMessage(`Problème de connexion au serveur : ${err}`);
      });
  };

  return (
    <Form onFinish={handleSubmit}>
      <div className="modal fade" id="ModalAddSanction" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Détails de la sanction</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <Form.Item
                name="reason"
                rules={[{ required: true, message: 'Merci de saisir la raison!' }]}
              >
                <TextArea placeholder="Raison" />
              </Form.Item>
            </div>
            <div className="modal-footer d-flex justify-content-around">
              <Button
                type="primary"
                htmlType="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ModalAddSanction;
