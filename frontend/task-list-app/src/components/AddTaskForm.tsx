import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import taskService from '../services/taskService';
import { Task } from '../interfaces/Task';
import '../assets/css/AddTaskForm.css';

interface AddTaskFormProps {
  onTaskAdded: () => void;
  onClose: () => void;
  editingTask: Task | null;
  userId: number;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded, onClose, editingTask, userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: editingTask ? editingTask.id : 0,
      title,
      description,
      status: 'Pending',
      userId: userId
    };

    try {
      if (editingTask) {
        await taskService.updateTask(userId, newTask);
      } else {
        await taskService.createTask(userId, newTask);
      }
      onTaskAdded();
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  return (
    <Box className="form-container">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-field"
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-field"
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="form-button"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          className="form-button"
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AddTaskForm;
