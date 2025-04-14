import { decryptData, encryptData } from './helpers';

const APP_NAME = 'TimViec';
const ACCESS_TOKEN = `${APP_NAME}_ACCESS_TOKEN`;
const REFRESH_TOKEN = `${APP_NAME}_REFRESH_TOKEN`;

const setAccessToken = (jwt: string) => {
  const encrypted = encryptData(jwt, ACCESS_TOKEN);
  localStorage.setItem(ACCESS_TOKEN, encrypted);
};

const getAccessToken = ()=> decryptData(localStorage.getItem(ACCESS_TOKEN) || '', ACCESS_TOKEN);

const isEmptyAccessToken = (): boolean => !getAccessToken();

const setRefreshToken = (token: string) => {
  const encrypted = encryptData(token, REFRESH_TOKEN);
  localStorage.setItem(REFRESH_TOKEN, encrypted);
};

const getRefreshToken = ()=> {
  const result = decryptData(localStorage.getItem(REFRESH_TOKEN) || '', REFRESH_TOKEN);
  return result;
};

const isEmptyRefreshToken = (): boolean => !getRefreshToken();

const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const isRefreshTokenRequired = (): boolean => {
  return isEmptyAccessToken() && !isEmptyRefreshToken();
};

const setApiKey = (apiKey: string): void => {
  const encrypted = encryptData(apiKey, 'api-key');
  localStorage.setItem('api-key', encrypted);
};

const getApiKey = (): string | null => {
  const data = localStorage.getItem('api-key');
  return data ? decryptData(data, 'api-key') : null;
};

const localStorageService = {
  setAccessToken,
  getAccessToken,
  isEmptyAccessToken,

  setRefreshToken,
  getRefreshToken,
  isEmptyRefreshToken,

  clearTokens,

  isRefreshTokenRequired,

  setApiKey,
  getApiKey,
};

export default localStorageService;
