import { useEffect, useState } from 'react';
import IRecommandation from '../../../@types/Home/recommandation';
import { excerpt } from '../../../utils/main';
import ModalAddRecomm from './modalAddRecomm';
import './style.scss';
import useFetchData from '../../../hook/useFetchData';
import SectionLayout from '../../../layout/SectionLayout';

const excerptLength = 250;
const idName = 'recommandation';

function Recommandation() {
  const [showDetailsText, setShowDetailsText] = useState<boolean>(false);
  const [dataRecommendation] = useFetchData('/api/home/recommandations');
  const [isFixed, setIsFixed] = useState(Array(dataRecommendation.length).fill(false));
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(`#${idName}-content .card`);
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardMiddleY = cardRect.top + cardRect.height / 2;
        setIsFixed((prevFixed) => [
          ...prevFixed.slice(0, index),
          cardMiddleY >= viewportHeight / 2
          && cardMiddleY <= (viewportHeight / 2) + cardRect.height,
          ...prevFixed.slice(index + 1),
        ]);
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [dataRecommendation]);
  return (
    <SectionLayout idName={idName} title="Recommandations" addButton="addRecommandation">
      <div
        className="d-flex flex-column justify-content-evenly justify-items-center bg-dark"
        id={`${idName}-content`}
        style={{
          height: `${dataRecommendation.length * 100}vh`,
        }}

      >
        {dataRecommendation.map((r: IRecommandation, index: number) => (
          <div
            className="card mb-3 w-50 mx-auto isFixed"
            key={r.id}
            style={{
              left: index % 2 !== 0 ? '' : '0',
              right: index % 2 !== 0 ? '0' : '',
              position: isFixed[index] ? 'fixed' : 'relative',
              // position fixed when element is in the middle of the screen when scrolling

            }}
          >
            <div className={`row g-0 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className="col-md-4 mx-auto align-self-center text-center">
                <img
                  src={r.avatar}
                  className="img-thumbnail rounded-circle text-center mx-auto"
                  alt={r.author}
                  width="100px"
                  height="100px"
                />
                <cite className="d-flex justify-content-center ">
                  <a href={r.linkedinLink}>
                    <i className="bi bi-linkedin mx-1" />
                    {r.author}
                  </a>
                </cite>

              </div>
              <div className="col-md-8 px-5">
                <div className="card-body">
                  <button
                    type="button"
                    className="fw-100 fs-5 lh-1 position-relative m-2 blockquote card border-0"
                    onClick={() => setShowDetailsText(!showDetailsText)}
                  >
                    {!showDetailsText
                      ? excerpt(r.recommandation, excerptLength) : r.recommandation}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ModalAddRecomm onAddElement={dataRecommendation} />
    </SectionLayout>

  );
}

export default Recommandation;
