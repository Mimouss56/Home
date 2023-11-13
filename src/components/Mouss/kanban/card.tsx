import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ICardTemplate } from '../../../@types/kanban';
import axiosInstance from '../../../utils/axios';

interface ICardTemplateProps {
  card: ICardTemplate;
  updateCards: () => void;
  listId: number; // Ajout de la propriété listId
}

export default function CardTemplate({ card, updateCards, listId }: ICardTemplateProps) {
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState(card.content);

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axiosInstance.put(`/kanban/cards/${card.id}`, {
        content,
        listId, // Utilisation de la nouvelle listId
      });
      setShowInput(false);
      updateCards();
    } catch (error) {
      toast.error(`Error updating card: ${error}`);
    }
  };

  const handleDeleteCard = async () => {
    try {
      await axiosInstance.delete(`/kanban/cards/${card.id}`);
      updateCards();
    } catch (error) {
      toast.error(`Error deleting card: ${error}`);
    }
  };

  return (
    <div id={card.id.toString()} className="rounded m-2 p-2 bg-light" style={{ border: `3px solid ${card.color}` }}>
      <div id="header">
        <i className="bi bi-tag-fill text-success fs-3 m-2" />
        {card.tags && card.tags.map((tag) => (
          <span className="badge d-flex p-2 align-items-center text-bg-primary rounded-pill" key={tag.id}>
            <span className="px-1">{tag.name}</span>
            <button type="button">
              <svg className="bi ms-1" width="16" height="16"><use xlinkHref="#x-circle-fill" /></svg>
            </button>
          </span>
        ))}
      </div>
      <div id="content" className="d-flex flex-row justify-content-between">
        {!showInput && (
          <p>{card.content}</p>
        )}
        {showInput && (
          <form onSubmit={handleEditSubmit}>
            <input type="hidden" name="cardId" value={card.id} />
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Card content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button className="btn btn-success" type="submit">Save</button>
            </div>
          </form>
        )}
        <div>
          <button type="button" onClick={() => setShowInput(!showInput)}>
            <i className="fs-5 bi bi-pencil-fill px-1 text-success" />
          </button>
          <button type="button" onClick={handleDeleteCard}>
            <i className="fs-5 bi bi-trash-fill px-1 text-danger" />
          </button>
        </div>
      </div>
    </div>
  );
}
