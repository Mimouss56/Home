import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element
}
// Vérifie si un token existe dans le sessionStorage, si oui accès aux pages
// si non redirection vers formulaire de connexion

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = sessionStorage.getItem('sessionToken');
  console.log(token);

  return sessionStorage.getItem('sessionToken') ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
