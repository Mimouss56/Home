export default function ButtonEndModal() {
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Fermer
      </button>
      <button
        type="submit"
        className="btn btn-primary"
        data-bs-dismiss="modal"
      >
        Enregistrer
      </button>
    </div>
  );
}
