import { LoginResponse } from '../@types/login';
// Je créer une fonction qui me permet
// de sauvegarder les données de l'utilisateur dans le localStorage
export const getUserDataFromLocalStorage = () => {
  const userDataStr = localStorage.getItem('user');
  const userData = userDataStr ? (JSON.parse(userDataStr)) as LoginResponse : null;
  return userData;
};

// Je créer une fonction qui me permet
// de supprimer les données de l'utilisateur dans le localStorage
export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('user');
};
