import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Container, AppBar, Toolbar, Typography, Box, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import UserProfilePopup from './components/UserProfilePopup';
import taskService from './services/taskService';
import userService from './services/userService';
import { Task } from './interfaces/Task';
import { User } from './interfaces/User';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/App.css';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [showAddTaskForm, setShowAddTaskForm] = useState<boolean>(false);
    const [openProfilePopup, setOpenProfilePopup] = useState<boolean>(false);
    const [openRegisterDialog, setOpenRegisterDialog] = useState<boolean>(false);
    const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (user) {
            loadTasks();
            loadProfilePicture();
        } else {
            setTasks([]);
            setProfilePicture(null);
        }
    }, [user]);

    const loadTasks = async () => {
        try {
            if (user) {
                const tasksData = await taskService.getTasksByUserId(user.id);
                setTasks(tasksData);
            }
        } catch (error) {
            console.error('Failed to load tasks:', error);
        }
    };

    const loadUser = async () => {
        try {
            const userData = await userService.getUser();
            setUser(userData);
        } catch (error) {
            console.error('Failed to load user:', error);
        }
    };

    const loadProfilePicture = async () => {
        if (user && user.id) {
            try {
                const picture = await userService.getProfilePicture(user.id);
                setProfilePicture(picture);
            } catch (error) {
                console.error('Failed to load profile picture:', error);
            }
        }
    };

    const countTasksByStatus = (status: string) => tasks.filter(task => task.status === status).length;

    const handleRegister = (user: User) => {
        setUser(user);
        setProfilePicture(null);
        setOpenRegisterDialog(false);
    };

    const handleLogin = (user: User) => {
        setUser(user);
        setProfilePicture(null);
        setOpenLoginDialog(false);
    };

    const handleUpdateProfilePicture = async () => {
        if (user && user.id) {
            const picture = await userService.getProfilePicture(user.id);
            setProfilePicture(picture);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setTasks([]);
        setProfilePicture(null);
    };

    const handleProfileClick = () => setOpenProfilePopup(true);
    const handleCloseProfilePopup = () => setOpenProfilePopup(false);

    const TaskCounters = () => (
        <Box className="task-counters" sx={{ marginTop: 2, padding: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Task Status</Typography>
            <Box display="flex" justifyContent="center">
                {['Pending', 'In Progress', 'Completed'].map(status => (
                    <Box key={status} display="flex" alignItems="center" mx={2}>
                        <span className={`status-key ${status.toLowerCase().replace(' ', '-')}`}></span>
                        <Typography variant="body1" sx={{ marginLeft: 1 }}>{status}: {countTasksByStatus(status)}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );

    const AuthButtons = () => (
        <Box display="flex" alignItems="center">
            {user ? (
                <>
                    <Button onClick={handleProfileClick} sx={{ textTransform: 'none' }}>
                        <Avatar alt={user.username || 'User'} src={profilePicture || ''} />
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
            ) : (
                <>
                    <Button color="inherit" onClick={() => setOpenRegisterDialog(true)}>Register</Button>
                    <Button color="inherit" onClick={() => setOpenLoginDialog(true)}>Login</Button>
                </>
            )}
        </Box>
    );

    return (
        <Router>
            <div className="professional-background left"></div>
            <div className="professional-background right"></div>
            <Container maxWidth="md" className="content-container">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Task Management App
                        </Typography>
                        <AuthButtons />
                    </Toolbar>
                </AppBar>
                <main>
                    <TaskCounters />
                    <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
                        {user && (
                            <Button variant="contained" color="primary" onClick={() => setShowAddTaskForm(true)}>
                                Add New Task
                            </Button>
                        )}
                    </Box>
                    <TaskList tasks={tasks} loadTasks={loadTasks} userId={user?.id || 0} />
                    {showAddTaskForm && (
                        <AddTaskForm 
                            onTaskAdded={loadTasks} 
                            onClose={() => setShowAddTaskForm(false)} 
                            editingTask={null}
                            userId={user?.id || 0}
                        />
                    )}
                    {user && (
                        <UserProfilePopup
                            user={user}
                            open={openProfilePopup}
                            onClose={handleCloseProfilePopup}
                            onUpdateProfilePicture={handleUpdateProfilePicture}
                            onDeleteProfilePicture={() => setProfilePicture(null)}
                        />
                    )}
                    <Dialog open={openRegisterDialog} onClose={() => setOpenRegisterDialog(false)}>
                        <DialogTitle>Register</DialogTitle>
                        <DialogContent>
                            <RegisterForm onRegister={handleRegister} onClose={() => setOpenRegisterDialog(false)} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenRegisterDialog(false)} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={openLoginDialog} onClose={() => setOpenLoginDialog(false)}>
                        <DialogTitle>Login</DialogTitle>
                        <DialogContent>
                            <Login onLogin={handleLogin} onClose={() => setOpenLoginDialog(false)} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenLoginDialog(false)} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                </main>
            </Container>
        </Router>
    );
};

export default App;
