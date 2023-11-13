import { ICardTemplate } from '../../../@types/kanban';
/* eslint-disable jsx-a11y/anchor-is-valid */

interface ICardTemplateProp {
  card: ICardTemplate;
}

export default function CardTemplate({ card }: ICardTemplateProp) {
  return (
    <div
      className="rounded m-2 p-2 bg-light"
      style={{
        border: `3px solid ${card.color}`,
      }}
    >
      <div id="header">
        <i className="bi bi-tag-fill text-success fs-3 m-2" />
        {card.tags && card.tags.map((tag) => (
          <span className="badge d-flex p-2 align-items-center text-bg-primary rounded-pill" key={tag.id}>
            <span className="px-1">{tag.name}</span>
            <a href="#"><svg className="bi ms-1" width="16" height="16"><use xlinkHref="#x-circle-fill" /></svg></a>
          </span>
        ))}
      </div>
      <div
        id="content"
        className="d-flex flex-row justify-content-between"
      >
        <p>{card.content}</p>
        <div>
          <i className="fs-5 bi bi-pencil-fill px-1 text-success" />
          <i className="fs-5 bi bi-trash-fill px-1 text-danger" />

        </div>
      </div>
    </div>
  );
}
