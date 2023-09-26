import { useEffect, useState } from 'react';
import Card from '../Card';
import axiosInstance from '../../utils/axios';
import { ICardNews } from '../../@types/card';

function Main() {
  // fetch data from api
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const result = await axiosInstance('/news');
    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  //

  return (

    <div className="container d-flex flex-wrap my-0">
      {data.map((item: ICardNews) => (
        <Card key={item.id}>
          {item.description}
        </Card>
      ))}
    </div>

  );
}

export default Main;
