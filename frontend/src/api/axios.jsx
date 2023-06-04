import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  config.headers['X-Origin'] = window.location.origin;
  return config;
});