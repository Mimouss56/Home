import { useEffect, useState } from 'react';
import Card from '../Card';
import axiosInstance from '../../utils/axios';
import { ICardNews } from '../../@types/Home/card';
import { INews } from '../../@types/Home/news';
import WindguruWidget from '../Modules/Windguru';
import TideWidget from '../Modules/TideWidget';

function Main() {
  // fetch data from api
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const result = await axiosInstance('/home/news');
    result.data = result.data.filter((news: INews) => news.draft === false);

    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  //

  return (

    <div className="container-fluid">
      {/* Section de Bienvenue */}
      <div className="my-5">
        <h1>Bienvenue sur Mon Site!</h1>
        <p>Découvrez les dernières actualités, mes outils et bien plus encore.</p>
      </div>

      {/* Widgets Météorologiques */}
      <div className="d-flex justify-content-center my-5">
        <WindguruWidget />
        <TideWidget />
      </div>

      {/* Section des Nouvelles (News) */}
      <div className="news-section my-5">
        <h2>Actualités</h2>
        <div className="d-flex flex-wrap">
          {data && data.map((item: ICardNews) => (
            <Card key={item.id}>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </Card>
          ))}
        </div>
      </div>

      {/* Footer ou Section d'Information Additionnelle */}
      <div className="footer-section my-5">
        {/* Contenu additionnel ou rappel des liens ici */}
      </div>
    </div>
  );
}

export default Main;
