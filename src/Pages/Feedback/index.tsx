// ccreation d'un formulaire de feedback au format modal de boostrap

function Feedback() {
  return (
    <>
      <div className=" position-fixed " style={{ top: '75%' }}>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#feedbackModal"
          className="btn btn-primary rounded-start-0 opacity-50 text-light z-1 "
        >
          Feedback
        </button>
      </div>
      <div className="modal fade" id="feedbackModal" tabIndex={-1} aria-labelledby="feedbackModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-light">
              <h5 className="modal-title" id="feedbackModalLabel">Feedback</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                  <input type="text" className="form-control" id="recipient-name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">Message:</label>
                  <textarea className="form-control" id="message-text" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary btn-sm">Send message</button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Feedback;
