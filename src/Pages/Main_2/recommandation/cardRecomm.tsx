import { useEffect, useRef, useState } from 'react';
import { excerpt } from '../../../utils/main';
import IRecommandation from '../../../@types/Home/recommandation';

const excerptLength = 250;
interface CardRecommProps {
  card: IRecommandation,
  index: number,
}

function CardRecomm({ card, index }: CardRecommProps) {
  const [showDetailsText, setShowDetailsText] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const cardStyle = {
    left: index % 2 !== 0 ? '' : '0',
    right: index % 2 !== 0 ? '0' : '',
    top: `${25 + (index * 5)}%`,
    minHeight: '300px',
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentCard = cardRef.current;
      const nextCard = currentCard?.nextElementSibling as HTMLElement;

      if (currentCard && nextCard) {
        const nextCardTop = nextCard.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Calculer la distance entre le bord supérieur de la fenêtre
        // et le bord supérieur de la prochaine carte
        const distance = nextCardTop - windowHeight;

        // Définir scaleFactor en fonction de la position de la prochaine carte
        let scaleFactor = 1;
        if (distance < 0) {
          // Si la prochaine carte est totalement visible au-dessus de la carte actuelle,
          // ajuster scaleFactor
          scaleFactor = Math.max(0.9, 0.9 + (distance / windowHeight) * 0.1);
        }
        // Appliquer la transformation à la carte actuelle
        currentCard.style.transition = 'transform 1s ease'; // Ajouter une transition CSS
        currentCard.style.transform = `scale(${scaleFactor})`;
      }
    };

    // ajout eventListenner on scroll page
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [index]);

  return (
    <div
      id="recommandation-card"
      className="card w-75 mx-auto my-5 position-sticky p-4 d-flex flex-column justify-content-center bg-secondary"
      key={card.id}
      style={cardStyle}
      ref={cardRef}
    >
      <div className={`row g-0 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
        <div className="col-md-4 mx-auto align-self-center text-center">
          <img
            src={card.avatar}
            className="img-thumbnail rounded-circle text-center mx-auto"
            alt={card.author}
            width="100px"
            height="100px"
          />
          <cite className="d-flex justify-content-center ">
            <a
              href={card.linkedinLink}
              className="link-underline link-underline-opacity-0 link-info "
            >
              <i className="bi bi-linkedin mx-1" />
              {card.author}
            </a>
          </cite>

        </div>
        <div className="col-md-8 px-xs-0 px-sm-5">
          <div className="card-body">
            <button
              type="button"
              className="fw-100 fs-5 lh-1 position-relative m-2 card border-0" // .blockquote
              onClick={() => setShowDetailsText(!showDetailsText)}
            >
              <span
                className="fs-5 bg-secondary text-info"
              >
                {!showDetailsText
                  ? excerpt(card.recommandation, excerptLength)
                  : card.recommandation}
              </span>
              <span
                id="beforeBlock"
                className="text-info position-absolute d-none d-sm-block"
                style={{
                  top: '-2rem',
                  width: '4rem',
                  height: '4rem',
                  fontSize: '8rem',
                  left: '-4rem',
                }}
              >
                “
              </span>
              <span
                id="afterBlock"
                className="text-info position-absolute d-none d-sm-block"
                style={{
                  bottom: '-2rem',
                  width: '4rem',
                  height: '4rem',
                  fontSize: '8rem',
                  right: '-4rem',
                }}
              >
                ”
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRecomm;
