import { useState } from 'react';
import axiosInstance from '../../utils/axios';

export default function ModalAddList({ updateLists }: { updateLists: () => void }) {
  const [content, setContent] = useState('' as string);
  const [error, setError] = useState('' as string);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    setError('');
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim()) {
      setError('Le nom de la liste ne peut pas être vide.');
      return;
    }
    await axiosInstance.post('/kanban/lists', {
      name: content,
    });
    updateLists();

    // Réinitialiser le champ après la soumission
    setContent('');
  };

  return (
    <div className="modal" id="addListModal">
      <div className="modal-dialog modal-dialog-centered">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-body">
              <section>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="name-list">Nom</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom de la liste"
                    aria-label="Nom de la liste"
                    aria-describedby="name-list"
                    value={content}
                    onChange={handleChange}
                    name="name-list"
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
