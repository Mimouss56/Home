/* eslint-disable react/no-danger */
import ICardPortfolio from '../../@types/portfolio';
import { baseUrl } from '../../../config.json';
import defaultImage from '../../assets/images/finish_website.jpeg';
import './style.scss';
import useFetchData from '../../hook/useFetchData';
import ModalAddFolio from '../Modal/PortFolio/formPortfolio';

function CardPortfolio() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const [dataPortfolio] = useFetchData('/api/home/portfolio');
  const listPortfolio = dataPortfolio
    .sort((a: ICardPortfolio, b: ICardPortfolio) => (a.id < b.id ? -1 : 1)) as ICardPortfolio[];

  return (
    <div
      className="d-flex flex-column justify-content-center w-75 m-auto"
    >
      {listPortfolio && listPortfolio.map((item, index) => (
        <div
          className="card mb-3 bg-warning-subtle shadow-sm p-1 rounded w-100 mb-2 "
          key={item.id}
          style={{
            animation: `slide-in-fwd-center ${(index - listPortfolio.length) * 0.2}s forwards`,
          }}
        >
          <div className="row">
            <div className="col-md-4 align-content-center my-auto">
              <img
                src={item.urlImg ? `${baseUrl}/images/${item.urlImg}` : defaultImage}
                className="img-fluid rounded-start w-75 h-75"
                alt={item.nameSite}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                {user && user.username === 'Mouss' && (
                  <button
                    type="button"
                    className="bi bi-gear text-danger btn position-absolute top-0 end-0 "
                    data-bs-toggle="modal"
                    data-bs-target="#addPortfolio"
                    data-bs-id={item.id}
                    data-bs-edit="true"
                    data-bs-type="portfolio"
                  />
                )}

                <h5 className="card-title text-center mb-3">{item.nameSite}</h5>

                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                {item.urlSite && (

                  <div className="card-footer">
                    <a href={item.urlSite}>Site Web</a>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      ))}
      <ModalAddFolio onAddElement={dataPortfolio} />

    </div>
  );
}

export default CardPortfolio;
