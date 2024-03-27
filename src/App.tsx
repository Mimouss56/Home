import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
//  CSS
import 'react-toastify/dist/ReactToastify.css';
// LAYOUT
import Footer from './layout/Footer';

// COMPONENTS
import Login from './components/Modal/Auth/login';
import Register from './components/Modal/Auth/register';
import Feedback from './components/Feedback';
import Snow from './components/Snowflakes';
import Notifications from './components/Notification';
import ListeRoute from './Routes';

// si le mois actuelle est 12 alors on import le style de noel
if (new Date().getMonth() === 11) {
  import('./scss/christmasTheme.scss');
}
const showFeedback = true; // true pour afficher le feedback
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

      <Login />
      <Register />
      <Notifications />
      <ListeRoute />

      <Footer />
    </>
  );
}

export default App;
