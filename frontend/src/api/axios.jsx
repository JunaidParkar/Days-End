import axios from 'axios';
import { signOutUser } from '../firebaseFunctions/authentication/auth';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("AuthToken");
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    await signOutUser();
  }
  config.headers['X-Origin'] = window.location.origin;
  return config
});
