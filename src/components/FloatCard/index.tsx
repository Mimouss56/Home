import dayjs from 'dayjs';
import { useState } from 'react';
import { ICard } from '../../@types/Home/card';
import './style.scss';

dayjs().format();

function FloatCard({
  url_img, title, desc, date, competences, ent, id,
}: ICard) {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const textFormatDuration = (dateObject: { debut: string, fin: string }) => {
    const test = dayjs(dateObject.fin).diff(dayjs(dateObject.debut), 'month', true);
    const years = Math.floor(test / 12);
    const months = Math.floor(test % 12);
    const duration = test > 12 ? `${years} ans et ${months} mois` : `${months} mois`;
    return duration;
  };

  return (
    <article className="card m-2 border-0">
      <div className="face face1">
        <div className="content">
          <img src={url_img} alt={ent} />
        </div>
        <div className="d-flex flex-wrap justify-content-evenly fixed-bottom">
          {competences.map((competence: string) => (
            <span key={competence} className="badge text-bg-light rounded-pill m-1">{competence}</span>
          ))}
        </div>
        {user && user.username === 'Mouss' && (
          <button
            type="button"
            className="bi bi-gear text-danger btn position-absolute top-0 end-0 "
            data-bs-toggle="modal"
            data-bs-target="#addItem"
            data-bs-id={id}
            data-bs-edit="true"
          />

        )}

      </div>
      <div className="face face2">
        <div className="card-body">
          <h5 className="card-title">
            <p>{title}</p>
          </h5>
          <div className="card-text">
            <p>{textFormatDuration(date)}</p>
            <p>{desc}</p>
          </div>
        </div>

      </div>

    </article>
  );
}

export default FloatCard;
