import './style.scss';
import { useEffect, useState } from 'react';
import { ICard } from '../../@types/Home/card';
import { excerpt, textFormatDuration } from '../../utils/main';
import { baseUrl } from '../../../config.json';
import defaultImg from '../../assets/images/finish_website.jpeg';

function FloatCard({
  urlImg, title, desc, date, competences, alt, id, target, type,
}: ICard) {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  // on check si l'url de l'image est local ou externe
  const [urlImgState, setUrlImgState] = useState('');
  useEffect(() => {
    if (urlImg && urlImg.includes('http')) {
      setUrlImgState(urlImg);
    } else if (urlImg) {
      setUrlImgState(`${baseUrl}/images/${urlImg}`);
    } else {
      setUrlImgState(defaultImg);
    }
  }, [urlImg]);
  return (
    <article className="card m-2 border-0">
      <div
        className="face face1"
      >
        {user && user.username === 'Mouss' && (
          <button
            type="button"
            className="bi bi-gear text-danger btn position-absolute top-0 end-0 "
            data-bs-toggle="modal"
            data-bs-target={`#${target}`}
            data-bs-id={id}
            data-bs-edit="true"
            data-bs-type={type}
          />
        )}
        <div className="bonnet" />
        <div className="content">
          <img src={urlImgState} alt={alt} />
        </div>
        {competences && (
          <div className="d-flex flex-wrap justify-content-evenly fixed-bottom">
            {competences.map((competence: string) => (
              <span key={competence} className="badge text-bg-light rounded-pill m-1">{competence}</span>
            ))}
          </div>
        )}
      </div>
      <div className="face face2">
        <div className="card-body">
          {title && (
            <h5 className="card-title">
              <p>{title}</p>
            </h5>
          )}
          {date && (
            <div className="card-text">
              {date && (
                <p>{textFormatDuration(date)}</p>
              )}
            </div>
          )}
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: (excerpt(desc, 200)) }}
          />
        </div>

      </div>

    </article>
  );
}

export default FloatCard;
