import dayjs from 'dayjs';
import { ICard } from '../../@types/Home/card';
import './style.scss';
import ModalCard from '../Modal/viewJob';

dayjs().format();

function FloatCard({
  url_img, title, desc, date, competences, ent, id,
}: ICard) {
  const test = dayjs(date.fin).diff(dayjs(date.debut), 'month', true);
  // recontruire la duration en Mois et Année
  // si l'année est supérieur à 1 an alors on affiche seulement les mois
  // sinon on affiche les années et les mois
  const years = Math.floor(test / 12);
  const months = Math.floor(test % 12);

  const duration = test > 12 ? `${years} ans et ${months} mois` : `${months} mois`;
  return (
    <>
      <article className="card m-2 border-0">
        <div className="face face1">
          <div className="content">
            <img src={url_img} alt={ent} />
          </div>
        </div>
        <div className="face face2">
          <div className="content">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p>{`${duration}`}</p>
            </div>
            <div className="card-footer">
              <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
              >
                Voir plus
              </button>
            </div>
          </div>
        </div>
      </article>
      <ModalCard
        title={title}
        date={date}
        desc={desc}
        competences={competences}
        url_img={url_img}
        ent={ent}
        id={id}
      />
    </>
  );
}

export default FloatCard;
