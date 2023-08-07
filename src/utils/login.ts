import { LoginResponse } from '../@types/login';
// Je créer une fonction qui me permet
// de sauvegarder les données de l'utilisateur dans le localStorage
export const getUserDataFromLocalStorage = () => {
<<<<<<< HEAD
  const userDataStr = sessionStorage.getItem('user');
=======
  const userDataStr = localStorage.getItem('user');
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
  const userData = userDataStr ? (JSON.parse(userDataStr)) as LoginResponse : null;
  return userData;
};

// Je créer une fonction qui me permet
// de supprimer les données de l'utilisateur dans le localStorage
export const removeUserDataFromLocalStorage = () => {
<<<<<<< HEAD
  sessionStorage.removeItem('user');
=======
  localStorage.removeItem('user');
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
};
