import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Card from '../../components/Card';
import axiosInstance from '../../utils/axios';
import { ICardNews } from '../../@types/Home/card';
import { INews } from '../../@types/Home/news';
import ICardPortfolio from '../../@types/portfolio';
import FloatCard from '../../components/FloatCard';
import ModalAddFolio from '../../components/Modal/PortFolio/formPortfolio';
import { ErrorSanctionProps } from '../../@types/error';
import DetailsFloatCard from '../../components/FloatCard/modalViewDetailsFloatCard';

function Main() {
  // fetch data from api
  const [listNews, setListNews] = useState([]);
  const [listPortfolio, setListPortfolio] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axiosInstance('/api/home/news');
      result.data = result.data.filter((news: INews) => news.draft === false);
      result.data.sort(
        (a: INews, b: INews) => (a.created_at < b.created_at ? 1 : -1),
      );
      setListNews(result.data);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }

    try {
      const resultPortfolio = await axiosInstance('/api/home/portfolio');
      setListPortfolio(resultPortfolio.data);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column mx-xs-0 flex-lg-row">
      <div className="w-lg-75 w-sm-100 mx-lg-5 mx-xs-0">
        {/* Section Héros/Bannière */}
        <section className="hero-section">
          <h1>Bienvenue sur Mimouss Home</h1>
          <p>
            {`
            Fort d'une formation intensive de 6 mois chez O'clock,
            axée sur le développement fullstack JS avec une spécialisation en API et DATA, j'ai acquis des compétences approfondies dans le domaine. 
            Mon parcours éclectique, ponctué d'expériences variées, reflète ma passion pour la technologie et ma capacité à m'adapter rapidement.
            Aujourd'hui, je suis prêt à relever de nouveaux défis et à apporter ma créativité dans le monde du développement logiciel.`}

          </p>
        </section>
        {/* Section Portfolio/Projets */}
        <section className="portfolio-section my-5">
          <h2>Portfolio</h2>
          {/* Ajoute ici des composants ou des liens vers tes projets */}
          <div className="d-flex flex-wrap justify-content-evenly">
            <ModalAddFolio onAddElement={fetchData} />
            <DetailsFloatCard />

            {listPortfolio && listPortfolio
              .map((item: ICardPortfolio) => (
                <div
                  key={item.id}
                  data-bs-toggle="modal"
                  data-bs-target="#viewDetailsFloatCard"
                  data-bs-id={item.id}
                  data-bs-type="portfolio"
                >
                  <FloatCard
                    id={item.id}
                    desc={item.description}
                    urlImg={item.urlImg}
                    alt={item.nameSite}
                    urlSite={item.urlSite}
                    target="addPortfolio"
                    type="portfolio"
                    title={item.nameSite}
                  />
                </div>
              ))}

          </div>

        </section>

        {/* Section Compétences */}
        {/* <section className="skills-section my-5">
          <h2>Mes Compétences</h2>
        </section> */}
      </div>
      <div className=" w-auto ">
        {/* Section Actualités */}
        <section className="news-section my-5">
          <h2>Actualités</h2>
          <div className="d-flex flex-wrap">
            {listNews && listNews.map((item: ICardNews) => (
              <Card key={item.id}>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Main;
