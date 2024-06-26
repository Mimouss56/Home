import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';
import Textarea from '../../Form/textarea';

interface ModalProps { updateCards: () => void }

export default function ModalAddList({ updateCards }: ModalProps) {
  const [content, setContent] = useState('' as string);
  const [listId, setListId] = useState(0 as number);
  const [color, setColor] = useState('' as string);
  const [error, setError] = useState('' as string);
  const [editMode] = useState(false);

  const handleFindListId = () => {
    const addItemModal = document.getElementById('addCardModal');
    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', (event) => {
        // Button that triggered the modal
        const button = (event as FocusEvent).relatedTarget;
        // const isEdit = (button as Element).getAttribute('data-bs-edit');

        // Extract info from data-bs-* attributes
        if (button) {
          const listIdAttr = (button as Element).getAttribute('data-bs-listid');
          if (listIdAttr) {
            setListId(Number(listIdAttr));
          }
        }
      });
    }
    // on remove le addEventListener
    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => { });
      }
    };
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!content.trim()) {
      setError('Le contenu de la carte ne peut pas être vide.');
      return;
    }
    try {
      const response = await axiosInstance.post('/api/kanban/cards', {
        content,
        color,
        listId,
      });
      const { data } = response;
      setError(data.message);
      updateCards();
    } catch (err) {
      toast.error(`Error adding card: ${err}`);
    }
    // Réinitialiser le champ après la soumission
    setContent('');
    // updateCards();
  };

  useEffect(
    handleFindListId,
    [],
  );

  return (
    <div className="modal" id="addCardModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editMode ? 'Modifier la carte' : 'Ajouter une carte'}

              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <section>
                <Textarea
                  title="Contenu"
                  text={content}
                  onChange={(event) => setContent(event.target.value)}
                  name="content"
                  icon={null}
                  leng={250}
                />

                <div className="input-group mb-3">
                  <span className="input-group-text" id="name-list">Couleur</span>
                  <input
                    type="color"
                    className="form-control-color form-control"
                    value={color}
                    aria-label="couleur de la carte"
                    aria-describedby="color-card"
                    onChange={(event) => setColor(event.target.value)}
                    name="name-list"
                    size={1}
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>
              </section>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Save changes</button>
            </div>
          </form>

        </div>
      </div>
    </div>

  );
}
