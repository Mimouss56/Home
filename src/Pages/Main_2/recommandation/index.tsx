import { useState } from 'react';
import IRecommandation from '../../../@types/Home/recommandation';
import { excerpt } from '../../../utils/main';
import ModalAddRecomm from './modalAddRecomm';
import './style.scss';
import useFetchData from '../../../hook/useFetchData';

function Recommandation() {
  const [showDetailsText, setShowDetailsText] = useState<boolean>(false);
  const [dataRecommendation] = useFetchData('/api/home/recommandations');

  const handleShowRecomm = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowDetailsText(!showDetailsText);
    const element = e.currentTarget;
  };
  return (
    <section className="recommandation">
      <div className="container">
        <h2 className="recommandation__title">Recommandations</h2>
        <button
          type="button"
          className="btn btn-primary "
          data-bs-toggle="modal"
          data-bs-target="#modalAddRecomm"
        >
          Ajouter une recommandation
        </button>
        <div className="recommandation__content">
          {dataRecommendation.map((r: IRecommandation, index: number) => (
            <div className="card mb-3" key={r.id}>
              <div className="row g-0">
                <div className="col-md-4 mx-auto align-self-center text-center">
                  <img
                    src={r.avatar}
                    className="img-thumbnail rounded-circle text-center mx-auto "
                    alt={r.author}
                    width="100px"
                    height="100px"

                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    {r.recommandation.length > 250 && showDetailsText === false
                      ? (
                        <button
                          type="button"
                          className="fw-100 fs-5 lh-1 position-relative m-2 blockquote card border-0"
                          style={{
                            transition: 'max-height 0.5s ease',
                          }}
                          onClick={handleShowRecomm}
                        >
                          {excerpt(r.recommandation, 250)}
                        </button>
                      )
                      : (
                        <p
                          className="fw-100 fs-5 lh-1 position-relative m-2 blockquote card border-0"
                        >
                          {r.recommandation}
                        </p>
                      )}

                    <cite className="d-flex justify-content-center ">
                      <a href={r.linkedinLink}>
                        <i className="bi bi-linkedin mx-1" />
                        {r.author}
                      </a>
                    </cite>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
      <ModalAddRecomm onAddElement={() => console.log('add element')} />
    </section>
  );
}

export default Recommandation;
