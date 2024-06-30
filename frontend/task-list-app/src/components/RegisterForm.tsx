import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { registerUser } from '../api/api';
import { User } from '../interfaces/User';
import '../assets/css/RegisterForm.css';

interface RegisterFormProps {
  onRegister: (user: User) => void;
  onClose: () => void; // Added onClose prop
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData: Partial<User> = {
      username,
      email,
      passwordHash: password,
      profilePictureFileName: ''
    };

    try {
      const response = await registerUser(userData);
      onRegister(response.data);
      setMessage('Registration successful!');
      setIsError(false);
      onClose();
    } catch (error) {
      setMessage('Registration failed.');
      setIsError(true);
    }
  };

  return (
    <Box className="form-container">
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-field"
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-field"
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-field"
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="form-button"
        >
          Register
        </Button>
      </form>
      {message && (
        <Typography
          variant="body1"
          className={isError ? 'error-message' : 'success-message'}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default RegisterForm;
