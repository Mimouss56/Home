const tagsModule = require('../tag');
const utilsModule = require('./utils');

const cardsModule = {
  // Card
  modalCard: document.getElementById('addCardModal'),
  showModalCard: document.querySelectorAll('.is-narrow'),
  formCardModal: document.querySelector('#addCardModal form'),
  // Template Card
  cardTemplate: document.querySelector('#card-template'),
  inputCardForm: document.querySelector("#addCardModal input[name='list_id']"),
  inputHidden: document.querySelector('#addCardModal input[type=hidden]'),

  // Card
  async handleAddCardForm(e) {
    e.preventDefault();
    const formData = e.target;
    const formDataObject = new FormData(formData);
    // On instancie le formulaire (qu'on a selectionné avec event.target) grâce à la classe FormData
    const data = Object.fromEntries(formDataObject);
    // envois a l'api
    if (data.list_id) {
      const res = await utilsModule.reqApi('POST', '/cards', data);
      cardsModule.makeCardInList(data);
    }
    if (data.card_id) {
      // Pour eviter une erreur dans la requete API on supprime le card_id de data
      delete data.card_id;
      const res = await utilsModule.reqApi('PUT', `/cards/${data.card_id}`, data);
      // Pour recharger la page on insère la list_id de la card modifié
      data.list_id = res.list_id;
      const goodCard = document.querySelector(`[data-card-id="${data.card_id}"]`);
      // On modifie le content de la card selectionnée
      goodCard.querySelector('.card-content').textContent = res.content;
      goodCard.querySelector('input[type=color]').value = res.color;
    }
    cardsModule.modalCard.classList.remove('is-active');
    e.target.reset(); // reset le formulaire
  },
  async handleEditCard(e, data, listId) {
    cardsModule.modalCard.classList.add('is-active');
    cardsModule.modalCard.querySelector('.modal-card-title').textContent = '\u00c9diter la carte';
    cardsModule.modalCard.querySelector('input[name=content]').value = data.content;
    const { cardId } = e.target.closest('.box').dataset;
    cardsModule.inputHidden.setAttribute('name', 'card_id');
    cardsModule.inputHidden.value = cardId;
    cardsModule.modalCard.querySelector('input[type=color]').value = data.color;
    e.target.reset(); // reset le formulaire
  },
  async handleDeleteCard(e, id) {
    const cardId = e.target.closest('.box');
    cardId.remove();
    const res = await utilsModule.reqApi('DELETE', `/cards/${id}`);
  },
  handleDragCard(e) {
    const oldList = e.from;
    const newList = e.to;
    let cards = oldList.querySelectorAll('.box');
    cardsModule.updateAllCard(cards);
    if (oldList === newList) return;
    cards = newList.querySelectorAll('.box');
    const { listId } = newList.closest('.panel').dataset;
    cardsModule.updateAllCard(cards, listId);
  },
  // Card Element
  async makeCardInList(data) {
    const goodList = document.querySelector(`[data-list-id="${data.list_id}"]`);
    const cardEmplacement = goodList.querySelector('.panel-block');

    const cardClone = document.importNode(cardsModule.cardTemplate.content, true);
    const editCard = cardClone.querySelector('a:first-child');
    const deleteCard = cardClone.querySelector('a:last-child');

    cardClone.querySelector('.card-content').textContent = data.content;
    cardClone.querySelector('.box').style.border = `2px solid ${data.color}`;
    cardClone.querySelector('.box').dataset.cardId = data.id;
    // Tag
    if (data.tags) {
      const tagTag = document.querySelector('.fa-tag');
      tagTag.addEventListener('click', (e) => tagsModule.showModalTag(e));
      const listTag = document.createElement('div');
      listTag.classList.add('tags');
      const goodCard = cardClone.querySelector(`[data-card-id="${data.id}"]`);
      data.tags.forEach((element) => {
        const closeElement = document.createElement('button');
        closeElement.classList.add('is-small');
        closeElement.classList.add('delete');

        const spanTag = document.createElement('span');
        spanTag.classList.add('tag');
        spanTag.textContent = element.name;
        spanTag.style.border = `2px solid ${element.color}`;

        spanTag.append(closeElement);
        listTag.appendChild(spanTag);

        goodCard.prepend(listTag);
      });
    }
    editCard.addEventListener('click', (e) => { cardsModule.handleEditCard(e, data, goodList.dataset.listId); }),
      deleteCard.addEventListener('click', (e) => { cardsModule.handleDeleteCard(e, data.id); }),
      cardEmplacement.appendChild(cardClone);
  },
  updateAllCard(cards, listId = null) {
    cards.forEach(async (card, index) => {
      const body = {};
      if (listId) body.list_id = listId;
      body.position = `${index}`;
      const res = await utilsModule.reqApi('PUT', `/cards/${card.dataset.cardId}`, body);
    });
  },
};
module.exports = cardsModule;
