import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ICard } from '../../../@types/Home/card';
import axiosInstance from '../../../utils/axios';
import ICardPortfolio from '../../../@types/portfolio';
import defaultImg from '../../../assets/images/finishWebsite.png';
import useMoussStore from '../../../store/mouss.store';
import useMeStore from '../../../store/me.store';

const initValueCard: ICard = {
  id: 0,
  title: '',
  desc: '',
  competences: [],
  urlImg: '',
  alt: '',
  target: '',
  type: '',
  date: { debut: '', fin: '' },
};
const baseUrl = import.meta.env.VITE_BASE_URL;

function DetailsFloatCard() {
  const [card, setCard] = useState<ICard>(initValueCard);
  const { me: user } = useMeStore((state) => state);
  const { mouss } = useMoussStore((state) => state);

  useEffect(() => {
    const addItemModal = document.getElementById('viewDetailsFloatCard');
    if (addItemModal) {
      addItemModal.addEventListener('show.bs.modal', async (event: Event) => {
        const { relatedTarget } = event as unknown as { relatedTarget: HTMLElement };
        const button = relatedTarget as HTMLButtonElement;
        const idModal = button.getAttribute('data-bs-id');
        const typeModal = button.getAttribute('data-bs-type');
        if (typeModal === 'portfolio') {
          axiosInstance.get(`/api/home/portfolio/${idModal}`)
            .then((response) => {
              const returnData = response.data as ICardPortfolio;
              setCard({
                id: returnData.id,
                title: returnData.nameSite,
                desc: returnData.description,
                urlImg: returnData.urlImg ? `${baseUrl}/images/${returnData.urlImg}` : defaultImg,
                alt: returnData.nameSite,
                target: returnData.urlSite,
                type: 'portfolio',
                competences: [],
                date: { debut: '', fin: '' },
              });
            })
            .catch((error) => {
              toast.error(error);
            });
        }
      });
    }
    return () => {
      if (addItemModal) {
        addItemModal.removeEventListener('show.bs.modal', () => { });
      }
    };
  }, []);

  return (
    <div
      className="modal fade"
      id="viewDetailsFloatCard"
      tabIndex={-1}
      aria-labelledby="viewDetailsFloatCardLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg  ">
        <div
          className="modal-content"
          style={{
            backgroundColor: '#113550',
            borderColor: 'rgb(80, 223, 219)',
          }}
        >
          <div className="modal-body">
            <div className="row g-0">
              <div className="col-md-4 p-3">
                <p className="fw-bold text-capitalize">{card.title}</p>
                {card.urlImg && card.urlImg !== '' && (
                  <img
                    src={card.urlImg}
                    className="img-thumbnail border-0 rounded-1"
                    // style={{ maxHeight: '300px' }}
                    alt={card.title}
                  />
                )}
              </div>
              <div className="col-md-8">
                <div
                  className="card-body"
                  style={{
                    backgroundColor: '#113550',
                  }}
                >
                  {user?.id === mouss?.id && (
                    <button
                      type="button"
                      className="bi bi-gear text-danger btn position-absolute top-0 end-0 "
                      data-bs-toggle="modal"
                      data-bs-target="#addPortfolio"
                      data-bs-id={card.id}
                      data-bs-edit="true"
                      data-bs-type="portfolio"
                    />
                  )}
                  <div
                    className="card-text"
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{ __html: card.desc }}
                    style={{
                      backgroundColor: '#113550',

                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {card.target && (
                <a href={card.urlSite} className="btn btn-primary">{card.title}</a>
              )}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsFloatCard;
