import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [notifToast, setnotifToast] = useState({ text: '', color: '' });
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('sessionToken');
  setnotifToast({
    text: 'Vous êtes déconnecté',
    color: 'success',
  });
  const navigate = useNavigate();
  useEffect(
    () => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('sessionToken');
      setnotifToast({
        text: 'Vous êtes déconnecté',
        color: 'success',
      });
      navigate('/');
    },
    [navigate],
  );
  return (
    <div />
  );
}

export default Logout;
