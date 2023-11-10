function addFunction() {
  return (
    <div className="modal" id="ModalAddOption">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add option</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              aria-label="Name"
              aria-describedby="button-addon2"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Value"
              name="value"
              aria-label="Value"
              aria-describedby="button-addon2"
            />
            <div className="form-check form-switch">
              <input
                className="form-check-input "
                type="checkbox"
                role="switch"
                name="active"
              />
            </div>
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

  );
}

export default addFunction;
