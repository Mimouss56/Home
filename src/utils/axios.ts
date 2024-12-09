import axios from 'axios';

// Je créer une instance d'axios pour pouvoir utiliser les interceptors et généré l'url de base
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
// J'utilise un interceptor pour ajouter le token dans le header de chaque requête
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('sessionToken')?.toString();
  // Do something before request is sent
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
}, (error) => {
  Promise.reject(error);
});

export default axiosInstance;
