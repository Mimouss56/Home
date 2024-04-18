import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
//  CSS
import 'react-toastify/dist/ReactToastify.css';
// LAYOUT
import Footer from './layout/Footer';
import MenuNav from './layout/User/aside.user';

// COMPONENTS
import Login from './components/Modal/Auth/login';
import Register from './components/Modal/Auth/register';
import Feedback from './components/Feedback';
import Snow from './components/Snowflakes';
import Notifications from './components/Notification';
import ListeRoute from './Routes';
import Navbar from './layout/Navbar';
import navItemsUser from '../data/navItemsUser.json';
import navItemsMouss from '../data/navItemsMouss.json';
import { IUser } from './@types/Home/user';

// si le mois actuelle est 12 alors on import le style de noel
if (new Date().getMonth() === 11) {
  import('./scss/christmasTheme.scss');
}
const showFeedback = true; // true pour afficher le feedback
// User menu

function App() {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  const updateUserInfo = () => {
    const storedUserInfo = sessionStorage.getItem('user');
    if (storedUserInfo) {
      const user = JSON.parse(storedUserInfo) as IUser;
      setUserInfo(user);
    } else {
      setUserInfo(null);
    }
  };
  useEffect(() => {
    // document.title = "Nom de Ton Site"; // Remplace par le nom de ton site
    if (sessionStorage.getItem('notifToast') != null) {
      toast.success(`🦄 ${sessionStorage.getItem('notifToast')} !`);
      sessionStorage.removeItem('notifToast');
    }
    updateUserInfo();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'sessionToken') {
        updateUserInfo();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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
      {window.location.pathname === '/' ? null : <Navbar navContent={[]} />}
      {userInfo && (<MenuNav navContent={[navItemsUser, navItemsMouss]} />)}
      <ListeRoute />

      <Footer />
    </>
  );
}

export default App;
