import { FormEvent, useState } from 'react';

function ModalAddItem() {
  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <form onSubmit={(e) => handleSave(e)}>
      <div
        className="modal fade"
        id="addItem"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ModalAddItem;
