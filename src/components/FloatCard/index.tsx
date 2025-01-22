import { useEffect, useState } from 'react';
import { ICard } from '../../@types/Home/card';
import { excerpt, textFormatDuration } from '../../utils/main';
import defaultImg from '../../assets/images/finishWebsite.png';
import useMeStore from '../../store/me.store';

const baseUrl = import.meta.env.VITE_BASE_URL;

function FloatCard({
  urlImg, title, desc, date, competences, alt, id, target, type,
}: ICard) {
  const { me: user } = useMeStore((state) => state);

  // on check si l'url de l'image est local ou externe
  const [urlImgState, setUrlImgState] = useState('');
  const [isHovered, setIsHovered] = useState(false);

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
    <article
      className="m-2 border-0 bg-transparent pe-auto position-relative "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

    >
      <div
        className="position-relative d-flex justify-content-center align-items-center z-1 rounded-4"
        style={{
          transform: !isHovered ? 'translateY(100px)' : 'translateY(0)',
          background: !isHovered ? 'rgb(245, 216, 188)' : 'rgb(255, 123, 0)',
          width: '300px',
          height: '200px',
          transition: '1s',
        }}
      >
        <div className="bonnet" />
        <div
          className="content"
          style={{
            transition: '0.5s',
            opacity: isHovered ? 1 : 'none',
          }}
        >
          <figure
            className="position-relative overflow-hidden m-0"
          >
            <img
              src={urlImgState}
              alt={alt}
              className="rounded-4"
              style={{
                maxWidth: '300px',
                maxHeight: '200px',
              }}
            />
          </figure>
        </div>
        {competences && (
          <div className="d-flex flex-wrap justify-content-evenly fixed-top">
            {competences.map((competence) => (
              <span key={competence.id} className="badge text-bg-light rounded-pill m-1">{competence.name}</span>
            ))}
          </div>
        )}
        <figcaption
          className="bg-black bg-opacity-25 position-absolute bottom-0 start-0 end-0 text-center rounded-bottom-4"
        >
          {title}
        </figcaption>

      </div>
      <div
        className="position-relative rounded-4 p-2 bg-secondary"
        style={{
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          boxSizing: 'border-box',
          transform: !isHovered ? 'translateY(-100px)' : 'translateY(0)',
          width: '300px',
          height: '200px',
          transition: '1s',
        }}
      >
        <div className="card-body">
          {user?.username === 'Mouss' && (
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
