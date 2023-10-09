import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Logout() {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('sessionToken');
  toast.success('Vous êtes déconnecté');

  const navigate = useNavigate();
  useEffect(
    () => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('sessionToken');
      toast.success('Vous êtes déconnecté');
      navigate('/');
    },
    [navigate],
  );
  return (
    <div />
  );
}

export default Logout;
