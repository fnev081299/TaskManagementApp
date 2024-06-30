import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { loginUser } from '../api/api';
import { User } from '../interfaces/User';
import '../assets/css/Login.css';

interface LoginProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, passwordHash: password });
      onLogin(response.data);
      setMessage('Login successful!');
      setIsError(false);
      onClose(); // Close the dialog on successful login
    } catch (error) {
      setMessage('Login failed.');
      setIsError(true);
    }
  };

  return (
    <Box className="form-container">
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Login
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

export default Login;
