export default function useRetrieveID(idModal: string) {
  const addItemModal = document.getElementById(idModal);

  if (addItemModal) {
    addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
      const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
      const button = relatedTarget as HTMLButtonElement;
      return button;
    });
  }
  // on remove le addEventListener
  return () => {
    if (addItemModal) {
      addItemModal.removeEventListener('show.bs.modal', () => { });
    }
  };
}
