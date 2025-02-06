function FooterSanction({id}: {id: number}) {
  return (
    <>
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
        {id !== 0 ? 'Modifier' : 'Ajouter'}
      </button>
    </>
  )
}

export default FooterSanction;