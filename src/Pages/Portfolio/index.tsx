import { useEffect, useState } from 'react';
import ICardPortfolio from '../../@types/portfolio';
import axiosInstance from '../../utils/axios';
import ModalAddFolio from '../../components/Modal/formPortfolio';
import FloatCard from '../../components/FloatCard';

function Portfolio() {
  const [listPortfolio, setListPortfolio] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const fetchData = async () => {
    const result = await axiosInstance.get('/home/portfolio');
    setListPortfolio(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Portfolio</h1>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addPortfolio"
      >
        Ajout d&apos;un item
      </button>
      <ModalAddFolio onAddElement={fetchData} />
      <section className="d-flex w-100 flex-wrap flex-row justify-content-evenly ">
        {listPortfolio && listPortfolio.map((item: ICardPortfolio) => (
          <FloatCard
            key={item.id}
            urlImg={item.urlImg}
            desc={item.description}
            alt={item.nameSite}
            id={item.id}
            urlSite={item.urlSite}
            target="#addPortfolio"
          />
        ))}
        {listPortfolio && listPortfolio.map((item: ICardPortfolio) => (
          <article
            className="card m-2 border-0"
            key={item.id}
          >
            <div className="face face1">
              <div className="bonnet" />
              <div className="content">
                {item.urlImg && (
                  <img src={`https://www.mimouss.fr/images/${item.urlImg}`} alt={item.nameSite} />
                )}
              </div>
              {user && user.username === 'Mouss' && (
                <button
                  type="button"
                  className="bi bi-gear text-danger btn position-absolute top-0 end-0 "
                  data-bs-toggle="modal"
                  data-bs-target="#addPortfolio"
                  data-bs-id={item.id}
                  data-bs-edit="true"
                />

              )}

            </div>
            <div className="face face2">
              <div className="card-body">
                <h5 className="card-title">
                  <p>
                    {item.description}
                  </p>
                </h5>
              </div>

            </div>

          </article>
        ))}

      </section>
    </div>
  );
}

export default Portfolio;
