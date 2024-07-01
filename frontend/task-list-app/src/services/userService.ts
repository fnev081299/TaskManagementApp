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

const getUser = async (): Promise<User> => {
  const api = await createApiInstance();
  const response = await api.get('/user/current');
  return response.data;
};

const getProfilePicture = async (userId: number): Promise<string> => {
  const api = await createApiInstance();
  const response = await api.get('/user/profilePicture', {
    params: { userId },
    responseType: 'blob'
  });
  return URL.createObjectURL(response.data);
};

const uploadProfilePicture = async (userId: number, file: File): Promise<void> => {
  const api = await createApiInstance();
  const formData = new FormData();
  formData.append('profilePicture', file);
  formData.append('userId', userId.toString());

  await api.post('/user/profilePicture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const updateProfilePicture = async (userId: number, file: File): Promise<void> => {
  const api = await createApiInstance();
  const formData = new FormData();
  formData.append('profilePicture', file);
  formData.append('userId', userId.toString());

  await api.put('/user/profilePicture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const deleteProfilePicture = async (userId: number): Promise<void> => {
  const api = await createApiInstance();
  await api.delete('/user/profilePicture', {
    params: { userId }
  });
};

const userService = {
  getUser,
  getProfilePicture,
  uploadProfilePicture,
  updateProfilePicture,
  deleteProfilePicture,
};

export default userService;
