import axios from 'axios';
import { isEmpty } from 'lodash';
import { trimObjectValues } from './helpers';
import localStorageService from './localStorage';
import { refreshToken } from '../store/auth/actions';
import { store } from '../store';

const requestConfig = {
  baseURL: "http://localhost:5454",
  timeout: 60000,
};

const handleRequest = (config: any, isPrivate = true) => {
  if (!isEmpty(config.data)) {
    config.data = trimObjectValues(config.data, { omitEmpty: false });
  }

  if (isPrivate) {
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
};

const handleResponse = (response: any) => response?.data || response;

const handleResponseError = async (error: any) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      await store.dispatch(refreshToken());

      const newToken = localStorageService.getAccessToken();
      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      }

      return privateRequest(originalRequest);
    } catch (refreshError) {
      localStorageService.clearTokens();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }

  const message = error.response?.data || error.message;
  return Promise.reject(message);
};

const privateRequest = axios.create(requestConfig);
privateRequest.interceptors.request.use(handleRequest);
privateRequest.interceptors.response.use(handleResponse, handleResponseError);

const publicRequest = axios.create(requestConfig);
publicRequest.interceptors.response.use(handleResponse, handleResponseError);

export { privateRequest, publicRequest };
