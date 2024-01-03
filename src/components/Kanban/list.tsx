import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ReactSortable, SortableEvent } from 'react-sortablejs';
import { ICardTemplate, IListTemplate } from '../../@types/Home/kanban';
import Card from './card';
import ModalAddCard from '../Modal/formCardKanban';
import axiosInstance from '../../utils/axios';

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
      setCards(data.cards.sort((a: ICardTemplate, b: ICardTemplate) => a.position - b.position));
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
    const movedCardId = evt.item.id;
    const movedCard = updatedCards.find((card) => card.id === Number(movedCardId));

    if (movedCard) {
      const listIdFrom = evt.from.id;
      movedCard.position = Number(evt.newIndex) + 1;

      const newListId = (Number(movedCard.list_id) === Number(evt.to.id)) ? listIdFrom : evt.to.id;
      try {
        await axiosInstance.put(`/kanban/cards/${movedCardId}`, {
          listId: newListId,
          position: Number(evt.newIndex) + 1,
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
    setCards(list.cards.sort((a: ICardTemplate, b: ICardTemplate) => a.position - b.position));
  }, [list.cards]);

  return (
    <div
      id={list.id}
      style={{
        width: '20rem',
        marginBottom: '1rem',
      }}
    >
      <div
        id="header"
        className="d-flex justify-content-between rounded-3 rounded-bottom-0"
        style={{
          backgroundColor: '#FF8500',
        }}
      >
        {!showInputTitle && (
          <h2
            className="text-white fs-4 p-2 align-items-center"
            onDoubleClick={() => setShowInputTitle(true)}
          >
            {`${list.name}`}
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
                  onChange={(e) => setNameList(e.target.value)}
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
        <div className="">
          <button
            data-bs-toggle="modal"
            data-bs-target="#addCardModal"
            data-bs-listid={list.id}
            type="button"
            className="btn p-0 mb-2"
          >
            <i
              className="fs-3 p-1 bi bi-plus-lg text-white"
            />

          </button>
          <button
            type="button"
            className="btn p-0 mb-2"
            onClick={handleDeleteList}
          >
            <span
              className="fs-3 bi bi-trash-fill text-danger"
            />
          </button>
        </div>
      </div>

      <div id="content" className="d-flex flex-column border border-top-0 border-2 border-warning-subtle rounded-3 rounded-top-0">
        <ReactSortable
          list={cards}
          setList={setCards}
          className="d-flex flex-column flex-wrap"
          id={list.id.toString()}
          onEnd={updateCardPosition}
          group="shared"
          swap
          animation={200}

        >
          {cards.map((card) => (
            <Card key={card.id} card={card} updateCards={updateCards} />
          ))}
        </ReactSortable>
      </div>

      <ModalAddCard updateCards={updateCards} />
    </div>
  );
}
