export default function deleteModal() {
  return (
    <div className="modal" id="modal-delete">
      <div className="modal-background" />
      <div className="modal-card">

        <section className="modal-card-body">
          <div className="field">
            <span className="label">Confirmation Delete</span>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button type="button" className="button is-success">Save changes</button>
          <button className="button close" type="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
}
