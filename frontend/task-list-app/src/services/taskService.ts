import axios from 'axios';
import { Task } from '../interfaces/Task';

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

const getTasksByUserId = async (userId: number): Promise<Task[]> => {
  const api = await createApiInstance();
  const response = await api.get(`/tasks/user/${userId}`);
  return response.data;
};

const createTask = async (userId: number, task: Task): Promise<Task> => {
  const api = await createApiInstance();
  const response = await api.post(`/tasks/user/${userId}`, task);
  return response.data;
};

const updateTask = async (userId: number, task: Task): Promise<Task> => {
  const api = await createApiInstance();
  const response = await api.put(`/tasks/${task.id}/user/${userId}`, task);
  return response.data;
};

const deleteTask = async (userId: number, taskId: number): Promise<void> => {
  const api = await createApiInstance();
  await api.delete(`/tasks/${taskId}/user/${userId}`);
};

const taskService = {
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
