import axios from 'axios';

const instance = axios.create({
  baseURL: '/kakao',
});
export const setLoginHeaders = (token) => {
  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
export default instance;
