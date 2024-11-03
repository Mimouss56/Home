import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
//  CSS
import 'react-toastify/dist/ReactToastify.css';
// LAYOUT
import Footer from './layout/Footer';

// COMPONENTS
import Feedback from './components/Feedback';
import Snow from './components/Snowflakes';
import Notifications from './components/Notification';
import ListeRoute from './Routes';
import Navbar from './layout/Navbar';
import navTop from '../data/navTop.json';
import { userContext, UserProvider } from './store/user.context';
import Login from './components/Modal/Auth/login';
import Register from './components/Modal/Auth/register';

// si le mois actuelle est 12 alors on import le style de noel
if (new Date().getMonth() === 11) {
  import('./scss/christmasTheme.scss');
}
// afficher le feedback en dehors du mode dev déclarer dans le .env
const showFeedback = true;

// User menu

export default function App() {
  const { user } = useContext(userContext);
  const [showNav, setShowNav] = useState(true);
  useEffect(() => {
    // document.title = "Nom de Ton Site"; // Remplace par le nom de ton site
    if (document.getElementById('landing-page')) setShowNav(false);

    if (sessionStorage.getItem('notifToast') != null) {
      toast.success(`🦄 ${sessionStorage.getItem('notifToast')} !`);
      sessionStorage.removeItem('notifToast');
    }
  }, []);

  return (
    <UserProvider>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        theme="light"
      />
      {showFeedback && <Feedback />}
      <Snow />

      <Notifications />
      {showNav && <Navbar navContent={navTop} />}
      <main><ListeRoute /></main>
      {!user && (<Login />)}
      {!user && (<Register />)}

      <Footer />
    </UserProvider>
  );
}
