import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ICard } from '../../@types/Home/card';
import axiosInstance from '../../utils/axios';
import ICardPortfolio from '../../@types/portfolio';
import { baseUrl } from '../../../config.json';
import defaultImg from '../../assets/images/default_img.png';

const initValueCard: ICard = {
  id: 0,
  title: '',
  desc: '',
  competences: [],
  urlImg: '',
  alt: '',
  target: '',
  type: '',
};

function DetailsFloatCard() {
  const [card, setCard] = useState<ICard>(initValueCard);

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
              });
            })
            .catch((error) => {
              toast.error(error);
            });
        }
      });
    }
  }, []);

  return (
    <div
      className="modal fade"
      id="viewDetailsFloatCard"
      tabIndex={-1}
      aria-labelledby="viewDetailsFloatCardLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content  ">
          <div className="modal-header">
            <h5 className="modal-title" id="viewDetailsFloatCardLabel">
              <p>{card.title}</p>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="card border-0 ">
              {card.urlImg && card.urlImg !== '' && (
                <img
                  src={card.urlImg}
                  className="img-thumbnail border-0 rounded-5 mx-auto"
                  style={{ maxHeight: '300px' }}
                  alt={card.title}

                />
              )}
              <div className="card-body">
                <div
                  className="card-text"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: (card.desc) }}
                />
                {card.urlSite && (
                  <a href={card.urlSite} className="btn btn-primary">{card.urlSite}</a>
                )}

              </div>
            </div>
            <div className="modal-footer">
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
