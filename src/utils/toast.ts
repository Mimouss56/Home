import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const NotifToastify = (message: string) => {
  useEffect(() => {
    toast.success(`🦄 ${message} !`);
  }, [message]);
};

export default NotifToastify;
