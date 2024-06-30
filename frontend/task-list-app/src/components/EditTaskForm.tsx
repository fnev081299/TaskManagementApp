import React, { useState } from 'react';
import { Task } from '../interfaces/Task';
import { TextField, Button, Select, MenuItem, Box, Typography, FormControl, InputLabel } from '@mui/material';
import '../assets/css/EditTaskForm.css';
interface EditTaskFormProps {
    task: Task;
    onUpdate: (task: Task) => void;
    onCancel: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onUpdate, onCancel }) => {
    const [title, setTitle] = useState<string>(task.title);
    const [description, setDescription] = useState<string>(task.description);
    const [status, setStatus] = useState<'Pending' | 'InProgress' | 'Completed'>(task.status);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({ ...task, title, description, status });
    };

    const getStatusColor = (status: 'Pending' | 'InProgress' | 'Completed') => {
        switch (status) {
            case 'Pending':
                return '#ffc107';
            case 'InProgress':
                return '#007bff';
            case 'Completed':
                return '#28a745';
            default:
                return 'gray';
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 4 }}>
            <Typography variant="h6">Edit Task</Typography>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                rows={4}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Pending' | 'InProgress' | 'Completed')}
                    label="Status"
                    sx={{
                        backgroundColor: getStatusColor(status),
                        color: 'white',
                        '& .MuiSelect-icon': {
                            color: 'white',
                        },
                    }}
                >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="InProgress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
                Update Task
            </Button>
            <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
                Cancel
            </Button>
        </Box>
    );
};

export default EditTaskForm;
