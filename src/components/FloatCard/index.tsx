import { ICard } from '../../@types/card';
import './style.scss';
import ModalCard from './Modal';

function FloatCard({
  url_img, title, desc, date, competences,
}: ICard) {
  return (
    <>
      <article className="card m-2 border-0">
        <div className="face face1">
          <div className="content">
            <img src={url_img} alt={title} />
          </div>
        </div>
        <div className="face face2">
          <div className="content">
            <p>{desc}</p>
            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target={`#${title.replaceAll(' ', '-')}`}>
              Voir plus
            </button>

          </div>
        </div>
      </article>
      <ModalCard title={title} date={date} desc={desc} competences={competences} url_img="" />
    </>
  );
}

export default FloatCard;