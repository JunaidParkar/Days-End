import axios from 'axios';
import { signOutUser } from '../firebaseFunctions/authentication/auth';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['X-Origin'] = window.location.origin;
  } catch (error) {
    console.error('Error retrieving token:', error);
    signOutUser();
  }
  return config;
});

export default api