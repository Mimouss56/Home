import IRecommandations from '../../../@types/Home/recommandation';
import InputText from '../../../components/Form/inputText';
import Textarea from '../../../components/Form/textarea';
import useFormInput from '../../../hook/useFormInput';

interface AddRecommModalProps {
  onAddElement: (data: IRecommandations) => void
}

function AddRecommModal({ onAddElement }: AddRecommModalProps) {
  const initFormData = {
    id: 0,
    firstName: '',
    lastName: '',
    linkedinLink: '',
    avatar: '',
    recommandation: '',
  };
  const {
    form, handleChange, handleSave,
  } = useFormInput(initFormData);

  return (
    <div>
      <form onSubmit={(e) => handleSave(e, '/api/home/recommandations', onAddElement)}>

        <div
          className="modal fade"
          id="modalAddRecomm"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une recommandation</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <InputText
                    title="firstName"
                    text={form.firstName}
                    icon="person"
                    name="firstName"
                    onChange={handleChange}
                  />
                  <InputText
                    title="lastName"
                    text={form.lastName}
                    icon="person"
                    name="lastName"
                    onChange={handleChange}
                  />
                  <InputText
                    title="linkedinLink"
                    text={form.linkedinLink}
                    icon="link"
                    name="linkedinLink"
                    onChange={handleChange}
                  />
                  <InputText
                    title="avatar"
                    text={form.avatar}
                    icon="person"
                    name="avatar"
                    onChange={handleChange}
                  />
                  <Textarea
                    title="recommandation"
                    text={form.recommandation}
                    name="recommandation"
                    onChange={handleChange}
                    icon={null}
                    leng={2000}
                  />

                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
export default AddRecommModal;
