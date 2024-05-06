import { useEffect } from 'react';
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

// si le mois actuelle est 12 alors on import le style de noel
if (new Date().getMonth() === 11) {
  import('./scss/christmasTheme.scss');
}
// afficher le feedback en dehors du mode dev déclarer dans le .env
const showFeedback = process.env.NODE_ENV === 'dev';
// User menu

function App() {
  useEffect(() => {
    // document.title = "Nom de Ton Site"; // Remplace par le nom de ton site
    if (sessionStorage.getItem('notifToast') != null) {
      toast.success(`🦄 ${sessionStorage.getItem('notifToast')} !`);
      sessionStorage.removeItem('notifToast');
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        theme="light"
      />
      {showFeedback && <Feedback />}
      <Snow />

      <Notifications />
      {/* {userInfo && (<MenuNav navContent={[navItemsUser, navItemsMouss]} />)} */}
      {window.location.pathname === '/' ? null : <Navbar navContent={navTop} />}
      <main><ListeRoute /></main>
      <Footer />
    </>
  );
}

export default App;
