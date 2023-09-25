import axios from 'axios';

const instance = axios.create({
  baseURL: '/posts',
});
export const setPostHeaders = (token) => {
  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
export default instance;
