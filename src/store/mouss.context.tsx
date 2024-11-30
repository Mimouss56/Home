import {
  ReactNode, createContext, useEffect, useMemo, useState,
} from 'react';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from '../utils/axios';
import { IUser } from '../@types/Home/user';

interface IMoussContext {
  mouss: IUser | undefined;
  setMouss: (mouss: IUser) => void;
  isLoading: boolean;
  error: Error | null;
}

const moussContext = createContext<IMoussContext>({
  mouss: {} as IUser,
  setMouss: () => { },
  isLoading: false,
  error: null,
});

async function fetchMouss(): Promise<IUser | AxiosError> {
  try {
    const result: AxiosResponse<IUser> = await axiosInstance.get(`/api/home/user/${import.meta.env.VITE_MOUSS_ID}`);
    return result.data;
  } catch (err) {
    const error = err as AxiosError;
    toast.error(`Une erreur est survenue : ${error.message}`);
    return error;
  }
}

function MoussProvider({ children }: { children: ReactNode }) {
  const [mouss, setMouss] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (mouss) return;
    const fetchData = async () => {
      setIsLoading(true);
      const moussData = await fetchMouss();
      if (moussData instanceof Error) {
        setError(moussData);
        setIsLoading(false);
        return;
      }
      setMouss(moussData);
      setIsLoading(false);
      setError(null);
    };
    fetchData();
  }, [mouss]);

  const value = useMemo(() => ({
    mouss, setMouss, isLoading, error,
  }), [mouss, setMouss, isLoading, error]);
  return (
    <moussContext.Provider value={value}>
      {children}
    </moussContext.Provider>
  );
}

export {
  moussContext,
  MoussProvider,
};
