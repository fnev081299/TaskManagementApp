import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Task } from '../interfaces/Task';
import taskService from '../services/taskService';
import EditTaskForm from './EditTaskForm';
import '../assets/css/TaskList.css';

interface TaskListProps {
  tasks: Task[];
  loadTasks: () => void;
  userId: number;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, loadTasks, userId }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const handleEditClick = (taskId: number) => {
    setEditingTaskId(taskId);
  };

  const handleUpdate = async (updatedTask: Task) => {
    try {
      await taskService.updateTask(userId, updatedTask);
      setEditingTaskId(null);
      loadTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  const handleDelete = async (taskId: number) => {
    try {
      await taskService.deleteTask(userId, taskId);
      loadTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const formatStatusText = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'InProgress':
        return 'In Progress';
      case 'Completed':
        return 'Completed';
      default:
        return status;
    }
  };

  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'status-key pending';
      case 'InProgress':
        return 'status-key in-progress';
      case 'Completed':
        return 'status-key completed';
      default:
        return '';
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} className="task-item">
          <Box display="flex" flexDirection="column" width="100%">
            {editingTaskId === task.id ? (
              <EditTaskForm task={task} onUpdate={handleUpdate} onCancel={handleCancel} />
            ) : (
              <>
                <ListItemText primary={task.title} secondary={task.description} />
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <span className={getStatusClassName(task.status)}></span>
                    <span>{formatStatusText(task.status)}</span>
                  </Box>
                  <Box>
                    <IconButton onClick={() => handleEditClick(task.id)}>✏️</IconButton>
                    <IconButton onClick={() => handleDelete(task.id)}>🗑️</IconButton>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
