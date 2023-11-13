const cardsModule = require('./cards');
const tagsModule = require('./tag');
const utilsModule = require('./utils');
const listsModule = require('./lists');
// on objet qui contient des fonctions
const app = {
  closeModal: document.querySelectorAll('.close'),
  // fonction d'initialisation, lancée au chargement de la page
  init() {
    console.log('app.init !');
    listsModule.loadList();
    app.addListenerToActions();
  },

  addListenerToActions() {
    this.closeModal.forEach((element) => {
      element.addEventListener('click', () => {
        listsModule.modalList.classList.remove('is-active');
        listsModule.modalDelete.classList.remove('is-active');
        cardsModule.modalCard.classList.remove('is-active');
      });
    });

    listsModule.showModalList.addEventListener('click', () => {
      listsModule.modalList.classList.add('is-active');
    });
    cardsModule.showModalCard.forEach((element) => {
      element.addEventListener('click', (e) => {
        cardsModule.modalCard.classList.add('is-active');
        const listId = e.target.closest('.panel');
        const valueDataset = listId.dataset.listId;
        cardsModule.inputHidden.value = valueDataset;
      });
    });

    listsModule.formListModal.addEventListener('submit', (e) => listsModule.handleAddListForm(e));
    cardsModule.formCardModal.addEventListener('submit', (e) => cardsModule.handleAddCardForm(e));
  },
  // List Element

};

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);
