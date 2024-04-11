import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { ICardTemplate } from '../../@types/Home/kanban';

interface ICardTemplateProps {
  card: ICardTemplate;
  updateCards: () => void;
}

export default function CardTemplate({ card, updateCards }: ICardTemplateProps) {
  const handleDeleteCard = async () => {
    try {
      await axiosInstance.delete(`/api/kanban/cards/${card.id}`);
      updateCards();
    } catch (error) {
      toast.error(`Error deleting card: ${error}`);
    }
  };

  return (
    <div id={card.id.toString()} className="rounded m-2 p-2 bg-light" style={{ border: `3px solid ${card.color}` }}>
      <div id="header">
        <i className="bi bi-tag-fill text-success fs-5 m-2" />
        {card.tags && card.tags.map((tag) => (
          <span className="badge d-flex p-2 align-items-center text-bg-primary rounded-pill" key={tag.id}>
            <span className="px-1">{tag.name}</span>
            <button type="button">
              <svg className="bi ms-1" width="16" height="16"><use xlinkHref="#x-circle-fill" /></svg>
            </button>
          </span>
        ))}
        <div>

          <button
            type="button"
            className="btn btn-sm p-0"
            onClick={handleDeleteCard}
          >
            <i className="fs-5 bi bi-trash-fill px-1 text-danger" />
          </button>
        </div>

      </div>
      <div id="content" className="d-flex flex-row justify-content-between">
        <p
          onDoubleClick={() => console.log('test')}
          className="text-dark"
        >
          {card.content}

        </p>
      </div>
    </div>
  );
}
