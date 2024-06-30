import axios from 'axios';
import { User } from '../interfaces/User';

const API_URL = 'https://localhost:7244/api/user';

const getUser = async (): Promise<User> => {
  const response = await axios.get(`${API_URL}/current`);
  return response.data;
};

const getProfilePicture = async (userId: number): Promise<string> => {
  const response = await axios.get(`${API_URL}/profilePicture`, {
    params: { userId },
    responseType: 'blob'
  });
  return URL.createObjectURL(response.data);
};

const uploadProfilePicture = async (userId: number, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('profilePicture', file);
  formData.append('userId', userId.toString());

  await axios.post(`${API_URL}/profilePicture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const updateProfilePicture = async (userId: number, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('profilePicture', file);
  formData.append('userId', userId.toString());

  await axios.put(`${API_URL}/profilePicture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const deleteProfilePicture = async (userId: number): Promise<void> => {
  await axios.delete(`${API_URL}/profilePicture`, {
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
