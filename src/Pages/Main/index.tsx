import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import axiosInstance from '../../utils/axios';
import { ICardNews } from '../../@types/Home/card';
import { INews } from '../../@types/Home/news';
import WindguruWidget from '../Modules/Windguru';
import TideWidget from '../Modules/TideWidget';

function Main() {
  // fetch data from api
  const [listNews, setListNews] = useState([]);
  const fetchData = async () => {
    const result = await axiosInstance('/home/news');
    result.data = result.data.filter((news: INews) => news.draft === false);
    setListNews(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex">
      <div className="col-9">
        {/* Section Héros/Bannière */}
        <section className="hero-section">
          <h1>Bienvenue sur Mimouss Home</h1>
          <p>Explorons ensemble les dernières actualités et bien plus encore.</p>
        </section>

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

        {/* Section Portfolio/Projets */}
        <section className="portfolio-section my-5">
          <h2>Portfolio</h2>
          {/* Ajoute ici des composants ou des liens vers tes projets */}
        </section>

        {/* Section Compétences */}
        <section className="skills-section my-5">
          <h2>Mes Compétences</h2>
          {/* Ajoute ici des balises ou des icônes représentant tes compétences */}
        </section>
      </div>

      <div className="col-3 d-flex flex-column border">
        {/* Section Widget Météo */}
        <section className="widget-section my-5">
          <h2>Prévisions Météo</h2>
          <WindguruWidget />
        </section>

        {/* Section Widget Marées */}
        <section className="widget-section my-5">
          <h2>Marées</h2>
          <TideWidget />
        </section>
      </div>
    </div>
  );
}

export default Main;
