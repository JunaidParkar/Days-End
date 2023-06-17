import axios from 'axios';
import { logOut } from '../functions/authentication/authentication';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(async (config) => {
  try {
    let token = localStorage.getItem("authToken");
    let uid = localStorage.getItem("uid");
    if (token && uid) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.data = { ...config.data, uid: uid };
    }
    config.headers['X-Origin'] = window.location.origin;
  } catch (error) {
    config.headers['X-Origin'] = window.location.origin;
  }
  return config;
});

export default api