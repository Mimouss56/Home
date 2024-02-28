import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';

type FetchDataProp = [any, boolean, boolean];

const useFetchData = (url: string | false): FetchDataProp => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(url);
        setData(response.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    setLoading(false);
  }, [url]);

  return [data, loading, error];
};

export default useFetchData;
