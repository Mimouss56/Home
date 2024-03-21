import { ICardNews } from '../../@types/Home/card';
import { INews } from '../../@types/Home/news';
import DetailsFloatCard from '../../components/FloatCard/modalViewDetailsFloatCard';
import Card from '../../components/Card';
import CardPortfolio from '../../components/cardPortfolio';
import useFetchData from '../../hook/useFetchData';
import { MoussID } from '../../../config.json';
import './style.scss';

function Main() {
  const [dataNews] = useFetchData('/api/home/news');
  const [dataCV] = useFetchData(`/api/home/user/${MoussID}`);

  const listNews = dataNews
    .filter((news: INews) => news.draft === false)
    .sort((a: INews, b: INews) => (a.created_at < b.created_at ? 1 : -1)) as INews[];

  return (
    <div className="d-flex flex-column mx-xs-0 flex-lg-row">
      <div className="w-lg-75 w-sm-100 mx-lg-5 mx-xs-0">
        {/* Section Héros/Bannière */}
        <section className="hero-section">
          <p>
            {dataCV.user?.prez}
          </p>
        </section>
        {/* Section Portfolio/Projets */}
        <section className="portfolio-section my-5">
          <h2
            className="text-center text-uppercase text-dark border-bottom border-secondary pb-2"
          >
            Projets
          </h2>
          <CardPortfolio />
        </section>
      </div>
      {/* Section Actualités */}
      <section className="news-section my-5 w-25 w-sm-100">
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
      <DetailsFloatCard />

    </div>
  );
}

export default Main;
