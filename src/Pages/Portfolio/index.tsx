import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ICardPortfolio from '../../@types/portfolio';
import axiosInstance from '../../utils/axios';
import ModalAddFolio from '../../components/Modal/formPortfolio';
import FloatCard from '../../components/FloatCard';
import { ErrorSanctionProps } from '../../@types/error';

function Portfolio() {
  const [listPortfolio, setListPortfolio] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axiosInstance.get('/api/home/portfolio');
      setListPortfolio(result.data);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ModalAddFolio onAddElement={fetchData} />
      <h1>Portfolio</h1>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addPortfolio"
      >
        Ajout d&apos;un item
      </button>
      <section className="d-flex w-100 flex-wrap flex-row justify-content-evenly ">
        {listPortfolio && listPortfolio.map((item: ICardPortfolio) => (
          <div key={item.id}>
            {item.urlSite ? (
              <a href={item.urlSite} target="_blank" rel="noopener noreferrer">
                <FloatCard
                  urlImg={item.urlImg}
                  desc={item.description}
                  alt={item.nameSite}
                  id={item.id}
                  urlSite={item.urlSite}
                  target="addPortfolio"
                />
              </a>
            ) : (
              <FloatCard
                urlImg={item.urlImg}
                desc={item.description}
                alt={item.nameSite}
                id={item.id}
                urlSite={item.urlSite}
                target="addPortfolio"
              />
            )}
          </div>
        ))}

      </section>
    </div>
  );
}

export default Portfolio;
