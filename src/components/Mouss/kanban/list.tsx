import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import { ICardTemplate, IListTemplate } from '../../../@types/kanban';
import Card from './card';
import ModalAddCard from './addCardModal';
import axiosInstance from '../../../utils/axios';

interface ListTemplateProps {
  list: IListTemplate['list'];
  updateList: () => void;
}

export default function List({ list, updateList }: ListTemplateProps) {
  const [showInputTitle, setShowInputTitle] = useState(false);
  const [nameList, setNameList] = useState(list.name);
  const [cards, setCards] = useState<ICardTemplate[]>([]);

  const updateCards = async () => {
    try {
      const response = await axiosInstance.get(`/kanban/lists/${list.id}`);
      const { data } = response;
      setCards(data.cards);
      updateList();
    } catch (error) {
      toast.error(`Error updating cards: ${error}`);
    }
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axiosInstance.put(`/kanban/lists/${list.id}`, {
        name: nameList,
      });
      setShowInputTitle(false);
      updateList();
    } catch (error) {
      toast.error(`Error updating list: ${error}`);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNameList(event.target.value);
  };

  const handleDeleteList = async () => {
    try {
      await axiosInstance.delete(`/kanban/lists/${list.id}`);
      updateList();
    } catch (error) {
      toast.error(`Error deleting list: ${error}`);
    }
  };

  const updateCardPosition = async (evt: SortableEvent) => {
    const updatedCards = [...cards];
    console.log(evt.from.id);
    console.log(evt.to.id);

    const movedCardId = evt.item.id;
    const movedCard = updatedCards.find((card) => card.id === Number(movedCardId));
    const movedCardListId = evt.to.id;

    if (movedCard) {
      movedCard.listId = list.id; // Mettre à jour le listId lors du déplacement de la carte

      try {
        await axiosInstance.put(`/kanban/cards/${movedCardId}`, {
          listId: movedCard.listId,
        });

        // Update state with the new order
        setCards(updatedCards.sort((a, b) => a.position - b.position));
      } catch (error) {
        toast.error(`Error updating cards: ${error}`);
      }
    }
  };

  useEffect(() => {
    setNameList(list.name);
  }, [list.name]);

  useEffect(() => {
    setCards(list.cards);
  }, [list.cards]);

  return (
    <div className="m-3 rounded" id={list.id}>
      <div
        className="d-flex justify-content-between"
        style={{
          backgroundColor: '#FF8500',
        }}
        id="header"
      >
        {!showInputTitle && (
          <h2
            className="text-white fs-4 p-2 align-items-center"
            onDoubleClick={() => setShowInputTitle(true)}
          >
            {`${list.name} (${list.id})`}
          </h2>
        )}
        {showInputTitle && (
          <form onSubmit={handleEditSubmit} name="list">
            <input type="hidden" name="listId" value={list.id} />
            <div className="field has-addons p-2">
              <div className="input-group mb-3 flex-nowrap">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom de la liste"
                  value={nameList}
                  onChange={handleChange}
                  name="name"
                  size={nameList.length}
                />
                <button
                  className="btn btn-success"
                  type="submit"
                  id="button-addon2"
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        )}
        <div>
          <i
            className="fs-3 p-1 bi bi-plus-lg text-white"
            data-bs-toggle="modal"
            data-bs-target="#addCardModal"
            data-bs-listid={list.id}
          />
          <button
            type="button"
            className="btn mb-2"
            onClick={handleDeleteList}
          >
            <span
              className="fs-3 bi bi-trash-fill text-danger"
            />
          </button>
        </div>
      </div>

      <div id="content" className="d-flex flex-column border border-top-0 border-2 border-warning-subtle">
        <ReactSortable
          list={cards}
          setList={setCards}
          className="d-flex flex-column"
          id={list.id.toString()}
          onEnd={updateCardPosition}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} updateCards={updateCards} listId={Number(list.id)} />
          ))}
        </ReactSortable>
      </div>

      <ModalAddCard updateCards={updateCards} />
    </div>
  );
}
