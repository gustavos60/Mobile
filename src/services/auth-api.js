import axios from 'axios';
import { responseMiddleware, errorMiddleware } from './middlewares';

const authApi = axios.create({
  baseURL: 'https://reqres.in/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

authApi.defaults.timeout = 4000;

authApi.interceptors.response.use(responseMiddleware, errorMiddleware);

export default authApi;
