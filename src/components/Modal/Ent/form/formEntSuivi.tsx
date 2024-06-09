import { useContext, useEffect } from 'react';
import { IEntreprise } from '../../../../@types/Home/ent';
import useFormInput from '../../../../hook/useFormInput';
import { entContext } from '../../../../store/ent.context';
import ButtonEndModal from '../../../Form/ButtonFooterModal';
import InputText from '../../../Form/inputText';

const initFormData: IEntreprise = {
  address: '',
  postalCode: '',
  town: '',
  urlImg: '',
  id: 0,
  name: '',
};

function AddEntModal() {
  const {
    form, setForm, handleChange, handleSave,
  } = useFormInput(initFormData);
  const { ent } = useContext(entContext) as { ent: IEntreprise[] };

  const onAddElement = (data: IEntreprise) => {
    const newEnt = data as IEntreprise;
    const index = ent.findIndex((e) => e.id === newEnt.id);
    if (index === -1) {
      ent.push(newEnt);
    } else {
      ent[index] = newEnt;
    }
  };

  useEffect(() => {
    const addItemModal = document.getElementById('addEntModal');
    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const nameAdd = button.getAttribute('data-bs-name-search');
        if (nameAdd) setForm({ ...initFormData, name: nameAdd });
        const idEnt = button.getAttribute('data-bs-id-ent');

        if (idEnt) {
          const entDetails = ent.find((e) => e.id === Number(idEnt));
          if (entDetails) setForm(entDetails);
        }
      });
    }
    // on remove le addEventListener
    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => { });
      }
    };
  }, [setForm, ent]);

  return (
    <form
      onSubmit={(e) => handleSave(e, '/api/home/ent', onAddElement)}
      className="modal fade"
      id="addEntModal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ajouter une entreprise</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <InputText
              title="Nom"
              text={form.name}
              name="name"
              onChange={handleChange}
              placeholder="Nom de l'entreprise"
            />
            <InputText
              title="Nom"
              text={form.address}
              name="address"
              onChange={handleChange}
              placeholder="N°, rue, avenue, etc..."
              icon="geo-alt"
            />
            <InputText
              title="Code postal"
              text={form.postalCode}
              name="postalCode"
              onChange={handleChange}
              placeholder="Code postal"
              icon="map"
            />
            <InputText
              title="Ville"
              text={form.town}
              name="town"
              onChange={handleChange}
              icon="buildings"
            />

            <InputText
              title="urlImg"
              text={form.urlImg}
              name="urlImg"
              onChange={handleChange}
              icon="globe2"
              placeholder="URL de l'image"

            />
            <ButtonEndModal />
          </div>
        </div>
      </div>

    </form>
  );
}

export default AddEntModal;
