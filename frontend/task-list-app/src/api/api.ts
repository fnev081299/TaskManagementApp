import axios from 'axios';
import { User } from '../interfaces/User';

const backendUrls = ['http://localhost:5083/api', 'https://localhost:7244/api'];

const getBackendUrl = async (): Promise<string> => {
  for (const url of backendUrls) {
    try {
      await axios.get(`${url}/status`);
      return url;
    } catch (error) {
      console.warn(`Backend not available at ${url}`);
    }
  }
  throw new Error('No backend available');
};

let API_BASE_URL: string | null = null;

const getApiBaseUrl = async () => {
  if (!API_BASE_URL) {
    API_BASE_URL = await getBackendUrl();
  }
  return API_BASE_URL;
};

const createApiInstance = async () => {
  const baseURL = await getApiBaseUrl();
  return axios.create({ baseURL });
};

export interface LoginData {
  username: string;
  passwordHash: string;
}

export const registerUser = async (userData: Partial<User>) => {
  const api = await createApiInstance();
  return api.post('/User/register', userData);
};

export const loginUser = async (loginData: LoginData) => {
  const api = await createApiInstance();
  return api.post('/User/login', loginData);
};
