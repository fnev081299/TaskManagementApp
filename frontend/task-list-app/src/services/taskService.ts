import axios from 'axios';
import { Task } from '../interfaces/Task';

const API_BASE_URL = 'https://localhost:7244/api';

const getTasksByUserId = async (userId: number): Promise<Task[]> => {
  const response = await axios.get(`${API_BASE_URL}/tasks/user/${userId}`);
  return response.data;
};

const createTask = async (userId: number, task: Task): Promise<Task> => {
  const response = await axios.post(`${API_BASE_URL}/tasks/user/${userId}`, task);
  return response.data;
};

const updateTask = async (userId: number, task: Task): Promise<Task> => {
  const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}/user/${userId}`, task);
  return response.data;
};

const deleteTask = async (userId: number, taskId: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/tasks/${taskId}/user/${userId}`);
};

const taskService = {
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
