import { useEffect, useState, lazy, Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import useMeStore from './store/me.store';
import useMoussStore, { MoussLoader } from './store/mouss.store';
import navTop from '../data/navTop.json';
import navItemsUser from '../data/navItemsUser.json';
import navItemsMouss from '../data/navItemsMouss.json';
import Loading from './components/Loading';

// Lazy load components
const Footer = lazy(() => import('./layout/Footer'));
const Feedback = lazy(() => import('./components/Feedback'));
const Snow = lazy(() => import('./components/Snowflakes'));
const Notifications = lazy(() => import('./components/Notification'));
const ListeRoute = lazy(() => import('./Routes'));
const Navbar = lazy(() => import('./layout/Navbar'));
const Login = lazy(() => import('./components/Modal/Auth/login'));
const Register = lazy(() => import('./components/Modal/Auth/register'));

// Load Christmas theme conditionally
if (new Date().getMonth() === 11) {
  import('./scss/christmasTheme.scss');
}

const showFeedback = true;

export default function App() {
  const { me } = useMeStore();
  const { fetch } = useMoussStore();
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setShowNav(location.pathname !== '/');
  }, [location]);

  useEffect(() => {
    const notifToast = sessionStorage.getItem('notifToast');
    if (notifToast) {
      toast.success(`🦄 ${notifToast} !`);
      sessionStorage.removeItem('notifToast');
    }
    fetch();
  }, [fetch]);

  return (
    <Suspense fallback={<Loading />}>
      <MoussLoader />
      <ToastContainer position="top-left" autoClose={5000} theme="light" />
      {showFeedback && <Feedback />}
      <Snow count={150} />
      <Notifications />
      {showNav && <Navbar />}
      <main><ListeRoute /></main>
      {!me && (
        <>
          <Login />
          <Register />
        </>
      )}
      <Footer />
    </Suspense>
  );
}
