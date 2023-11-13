import { useEffect, useState } from 'react';
import { IListTemplate } from '../../../@types/kanban';
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
  const [cards, setCards] = useState(list.cards);

  const updateCards = async () => {
    try {
      const response = await axiosInstance.get(`/kanban/lists/${list.id}`);
      const { data } = response;
      setCards(data);
    } catch (error) {
      console.error('Error updating lists:', error);
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
      console.error('Error updating lists:', error);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNameList(event.target.value);
  };

  const handleDeleteListe = async () => {
    try {
      await axiosInstance.delete(`/kanban/lists/${list.id}`);
      updateList();
    } catch (error) {
      console.error('Error updating lists:', error);
    }
  };

  useEffect(() => {
    setNameList(list.name);
  }, [list.name]);

  return (
    <div className="m-3 rounded">
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
            {list.name}
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
            onClick={handleDeleteListe}
          >
            <span
              className="fs-3 bi bi-trash-fill text-danger"
            />
          </button>

        </div>
      </div>
      <div id="content" className="d-flex flex-column border border-top-0 border-2 border-warning-subtle">
        {cards && cards.map((card) => (

          <Card key={card.id} card={card} />
        ))}
      </div>
      <ModalAddCard updateCards={updateCards} />

    </div>

  );
}
