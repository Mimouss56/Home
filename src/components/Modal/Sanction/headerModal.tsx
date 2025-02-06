function ModalHeaderSanction({id}: {id: number}) {
  return(
    <div className="modal-header">
    <h2>{`${id === 0 ? 'Ajouter' : 'Editer'} la sanction`}</h2>
    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
  </div>
  )
}

export default ModalHeaderSanction;