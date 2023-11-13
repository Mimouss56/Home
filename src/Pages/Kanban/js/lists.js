const cardsModule = require('./cards');

const listsModule = {
  cardsList: document.querySelector('.card-lists'),
  // List
  modalList: document.getElementById('addListModal'),
  showModalList: document.getElementById('addListButton'),
  modalDelete: document.getElementById('modal-delete'),
  // showModalDelete : document.querySelectorAll('.modal-delete'),
  formListModal: document.querySelector('#addListModal form'),
  // list Template
  listTemplate: document.querySelector('#list-template'),

  async loadList() {
    const lists = await utilsModule.reqApi('GET', '/lists');
    lists.forEach((list) => {
      listsModule.makeListInDom(list);
      list.cards.forEach((card) => {
        cardsModule.makeCardInList(card);
      });
    });
    Sortable.create(listsModule.cardsList, {
      draggable: '.panel',
      onEnd: listsModule.handleDragList,
    });
  },
  async handleAddListForm(e) {
    e.preventDefault();

    const formData = e.target;
    const formDataObject = new FormData(formData); // On instancie le formulaire (qu'on a selectionné avec event.target) grâce à la classe FormData
    const data = Object.fromEntries(formDataObject);
    // Ajout des listes
    const res = await utilsModule.reqApi('POST', '/lists', data);
    listsModule.makeListInDom(data);

    listsModule.modalList.classList.remove('is-active');
    e.target.reset(); // reset le formulaire
    // recharger la page
  },
  handleShowDeleteModal(e, id) {
    // listsModule.showModalDelete.forEach(element => {
    //   console.log(element);
    //   //const deleteCard = cardClone.querySelector('a:last-child');
    listsModule.modalDelete.classList.add('is-active');
    listsModule.modalDelete.querySelector('.is-success').addEventListener('click', (e) => listsModule.handleDeleteList(e, id));
    // listsModule.m

    // })
  },
  async handleDeleteList(e, id) {
    const listId = document.querySelector(`[data-list-id="${id}"]`);
    listId.remove();
    listsModule.modalDelete.classList.remove('is-active');
    const res = await utilsModule.reqApi('DELETE', `/lists/${id}`);
  },
  makeListInDom(data) {
    const listClone = document.importNode(listsModule.listTemplate.content, true);
    listClone.querySelector('h2').addEventListener('dblclick', (e) => listsModule.handleTitleForm(e));

    listClone.querySelector('h2').textContent = data.name;
    // Set Dataset
    listClone.querySelector('.panel').dataset.listId = data.id;
    listClone.querySelector('[name="list-id"]').value = data.id;
    // Text Content
    listClone.querySelector('.is-narrow').addEventListener('click', (e) => {
      cardsModule.modalCard.classList.add('is-active');
      cardsModule.inputHidden.value = e.target.closest('.panel').dataset.listId;
    });
    const deleteList = listClone.querySelector('.is-narrow:last-child');
    deleteList.addEventListener('click', (e) => { listsModule.handleShowDeleteModal(e, data.id); });
    const cardContainer = listClone.querySelector('.panel-block');

    Sortable.create(cardContainer, {
      group: 'lists',
      draggable: '.box',
      onEnd: cardsModule.handleDragCard,
    });
    listsModule.cardsList.appendChild(listClone);
  },
  handleTitleForm(e) {
    const titleElem = e.target;
    const formTitle = titleElem.parentNode.querySelector('form');
    formTitle.addEventListener('submit', (e) => listsModule.handleSubmitTitle(e));
    formTitle.classList.remove('is-hidden');
    titleElem.classList.add('is-hidden');
  },
  async handleSubmitTitle(e) {
    e.preventDefault();
    const formData = e.target;
    const data = new FormData(formData); // On instancie le formulaire (qu'on a selectionné avec event.target) grâce à la classe FormData
    // const data = Object.fromEntries(formDataObject);
    // envois a l'api avec return de la value
    const res = await utilsModule.reqApi('PUT', `/lists/${data.get('list-id')}`, { name: data.get('list-name') });
    formData.parentNode.querySelector('h2').textContent = res.name;
    formData.parentNode.querySelector('h2').classList.remove('is-hidden');
    formData.classList.add('is-hidden');
  },
  handleDragList(e) {
    const lists = document.querySelectorAll('.panel');
    lists.forEach((list, index) => {
      const body = {};
      body.position = `${index}`;
      const res = utilsModule.reqApi('PUT', `/lists/${list.dataset.listId}`, body);
    });
  },
};

module.exports = listsModule;
