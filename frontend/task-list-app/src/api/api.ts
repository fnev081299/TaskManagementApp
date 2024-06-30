import axios from 'axios';
import { User } from '../interfaces/User';

const API_BASE_URL = 'https://localhost:7244/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface LoginData {
  username: string;
  passwordHash: string;
}

export const registerUser = (userData: Partial<User>) => {
  return api.post('/User/register', userData);
};

export const loginUser = (loginData: LoginData) => {
  return api.post('/User/login', loginData);
};
