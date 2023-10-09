import { useEffect, useState } from 'react';
import Card from '../Card';
import axiosInstance from '../../utils/axios';
import { ICardNews } from '../../@types/card';
import { INews } from '../../@types/news';
import WindguruWidget from '../Modules/Windguru';
import TideWidget from '../Modules/TideWidget';

function Main() {
  // fetch data from api
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const result = await axiosInstance('/news');
    result.data = result.data.filter((news: INews) => news.draft === false);

    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  //

  return (

    <div className="d-flex flex-wrap my-0">
      <WindguruWidget />
      <TideWidget />
      {data && (
        data.map((item: ICardNews) => (
          <Card key={item.id}>

            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
            {/* { item.content} */}
          </Card>
        )))}
    </div>

  );
}

export default Main;
