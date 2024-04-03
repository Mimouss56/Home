import { useState } from 'react';
import IRecommandation from '../../../@types/Home/recommandation';
import { excerpt } from '../../../utils/main';
import ModalAddRecomm from './modalAddRecomm';
import './style.scss';
import useFetchData from '../../../hook/useFetchData';
import useScrollSection from '../../../hook/useScrollSection';
import SectionLayout from '../../../layout/SectionLayout';

const excerptLength = 250;
const idName = 'recommandation';

function Recommandation() {
  const [showDetailsText, setShowDetailsText] = useState<boolean>(false);
  const [dataRecommendation] = useFetchData('/api/home/recommandations');
  useScrollSection(idName);

  return (
    <>
      <SectionLayout idName={idName} title="Recommandations" addButton="addRecommandation">
        <div className="my-5">
          {dataRecommendation.map((r: IRecommandation, index: number) => (
            <div
              className="card mb-3 w-75 mx-auto"
              key={r.id}
              style={{
                left: index % 2 !== 0 ? '' : '0',
                right: index % 2 !== 0 ? '0' : '',
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
                  <cite className="d-flex justify-content-center">
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
                      style={{
                        transition: 'max-height 0.5s ease',
                      }}
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
      </SectionLayout>
      <ModalAddRecomm onAddElement={dataRecommendation} />
    </>

  );
}

export default Recommandation;
