import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
  children: JSX.Element
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = sessionStorage.getItem('sessionToken') || '';

  // Si absence de Token dans le sessionStorage, redirection vers la page d'accueil
  if (!token) {
    toast.error('Vous devez être connecté pour accéder à cette page');

    return <Navigate to="/" replace />;
  }
  // Si Token présent dans le sessionStorage, vérification de sa validité

  // On récupère la date d'expiration du token
  const tokenExp = JSON.parse(atob(token.split('.')[1])).exp;
  const dateExp = new Date(tokenExp).valueOf();
  const dateNow = Date.now().valueOf() / 1000;

  if (dateNow > dateExp) {
    sessionStorage.removeItem('sessionToken');
    toast.error('Votre session a expiré');
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
