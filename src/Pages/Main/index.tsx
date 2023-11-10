import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import axiosInstance from '../../utils/axios';
import { ICardNews } from '../../@types/Home/card';
import { INews } from '../../@types/Home/news';
import WindguruWidget from '../../components/Modules/Windguru';
import TideWidget from '../../components/Modules/TideWidget';

function Main() {
  // fetch data from api
  const [listNews, setlistNews] = useState([]);
  const fetchData = async () => {
    const result = await axiosInstance('/home/news');
    result.data = result.data.filter((news: INews) => news.draft === false);

    setlistNews(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  //

  return (

    <div className="d-flex">
      <div className="col-9">
        <div className="d-flex flex-wrap border">
          <div className="d-flex justify-content-center my-5">
            <div className="news-section my-5">
              <h2>Actualités</h2>
              <div className="d-flex flex-wrap">
                {listNews && listNews.map((item: ICardNews) => (
                  <Card key={item.id}>
                    {/* eslint-disable-next-line react/no-danger */}
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 d-flex flex-column border">
          <WindguruWidget />
          <TideWidget />
        </div>
      </div>
    </div>
  );
}

export default Main;
