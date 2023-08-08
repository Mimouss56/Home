import {
  Form, Input, Button, Switch,
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axiosInstance from '../../utils/axios';
import { ISanction } from '../../@types/sanction';

const { TextArea } = Input;

interface FormValues {
  reason: string;
}
interface ModalAddSanctionProps {
  onAddSanction: (sanction: ISanction) => void;
}
function ModalAddSanction({ onAddSanction }: ModalAddSanctionProps) {
  const handleSubmit = (values: FormValues) => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const newUser = {
      label: values.reason,
      author_id: user.id,
    };

    axiosInstance.post('/sanction', newUser).then((res) => {
      sessionStorage.setItem('notifToast', 'Sanction ajoutée');

      // Assume that the server returns the newly created sanction object
      const newSanction = res.data;
      onAddSanction(newSanction);
    }).catch((err) => {
      sessionStorage.setItem('notifToast', err.message);
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
              <Form.Item>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  disabled
                />
                <span className="ms-2">Important</span>
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
                className="btn btn-success"
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
