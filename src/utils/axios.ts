import axios from 'axios';
import { getUserDataFromLocalStorage } from './login';
import { urlAPI } from '../../config.json';
// Je créer une instance d'axios pour pouvoir utiliser les interceptors et généré l'url de base
const axiosInstance = axios.create({
  baseURL: urlAPI,
});
// J'utilise un interceptor pour ajouter le token dans le header de chaque requête
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('sessionToken')?.toString();
  const userData = getUserDataFromLocalStorage();
  // Do something before request is sent
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
}, (error) => {
  Promise.reject(error);
});

export default axiosInstance;
